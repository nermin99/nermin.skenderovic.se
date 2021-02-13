const root = document.querySelector('#root')

/**
 * Objects
 */
var tallyCounter = {}
var substanceS = []
var columnData = {}

init()
function init() {
  const subs = []

  for (let i = 0; i < 10; i++) {
    subs.push(new Substance(i, ''))
  }

  substanceS = subs

  columnData = {
    alt1: '',
    alt2: '',
  }

  // loads saved substances & column data
  if (typeof Storage !== 'undefined') {
    if (localStorage.getItem('substances') !== null) {
      substanceS = load('substances')
    }

    if (localStorage.getItem('columnData') !== null) {
      columnData = load('columnData')
    }
  }

  tallyCounter = {
    substances: substanceS,
    columnData: columnData,
  }

  render()
  initLoadFromFile()
  window.addEventListener('keydown', runHotkey)
}

function increment(substance) {
  substance.quantity++
  animate(substance.id)
}

function decrement(substance) {
  if (substance.quantity <= 0) return
  substance.quantity--
  render()
}

function addNew() {
  const n = document.querySelector('#number').value

  // empty table
  if (substanceS.length === 0) {
    substanceS.push(new Substance(0))
    render()
    return
  }

  for (let i = 0; i < n; i++) {
    const substance = new Substance(substanceS[substanceS.length - 1].id + 1)
    substanceS.push(substance)
  }
  render()
}

function removeOld(id) {
  const substance = substanceS.find((sub) => sub.id === id)

  substanceS.splice(substanceS.indexOf(substance), 1)
  render()
}

function animate(id) {
  const substanceRow = document.querySelector(`[data-id="${id}"]`)
  if (substanceRow.dataset.animating) return // don't add another animation if current one is running

  substanceRow.classList.add('animate')
  substanceRow.dataset.animating = 'true'

  substanceRow.addEventListener('transitionend', () => {
    // remove the class
    substanceRow.classList.remove('animate')
    substanceRow.addEventListener('transitionend', () => {
      substanceRow.dataset.animating = 'false'
      render() // render once the remove is complete
    })
  })
}

function render() {
  const currentAnimation = document.querySelector('.animate')
  if (currentAnimation && currentAnimation.dataset.animating) return // current

  const html = `
        <table id="table" class="table table-striped table-bordered table-hover">
          <col width="3%"/>
          <col width="7%"/>
          <col width="8%"/>
          <col width="9%"/>
          <col width="19%"/>
          <col width="8%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="8%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="7%"/>
          <col width="3%"/>

          <thead class="thead-dark">
            <th scope="col">No</th>
            <th scope="col">Magn x</th>
            <th scope="col">Count part</th>
            <th scope="col">Tally key</th>
            <th scope="col">Species</th>
            <th scope="col">C/kol/100µ</th>
            <th scope="col">No count</th>
            <th scope="col">Size class</th>
            <th scope="col">Cell vol µm3</th>
            <th scope="col">Group</th>
            <th scope="col" class="alt1" contenteditable="true" oninput="saveColumnData(this)">${
              columnData.alt1
            }</th>
            <th scope="col" class="alt2" contenteditable="true" oninput="saveColumnData(this)" colspan="2">${
              columnData.alt2
            }</th>
          </thead>
          <tbody>
          ${substanceS
            .map((substance, id) => {
              const hotkey = substance.tallyKey
              return `
              <tr data-id="${substance.id}">
                <td class="id">${id}</td>
                <td class="magnification input" oninput="saveEdit(this)">
                  <input list="magnification-list" contenteditable="true" type="number" value="${
                    substance.magnification
                  }">

                  <datalist id="magnification-list">
                    <option value="100">
                    <option value="200">
                    <option value="400">
                  </datalist>
                </td>
                <td class="countPart" contenteditable="true" oninput="saveEdit(this)">${
                  substance.countPart
                }</td>
                <td class="tallyKey" onclick="assignHotkey(${substance.id})">
                  ${hotkey ? (hotkey.shift ? 'shift +' : '') : ''}
                  ${hotkey ? (hotkey.ctrl ? 'ctrl +' : '') : ''}
                  ${hotkey ? (hotkey.alt ? 'alt +' : '') : ''}
                  ${hotkey ? hotkey.key : 'no key'}
                </td>
                <td class="species" contenteditable="true" oninput="saveEdit(this)">${
                  substance.species
                }</td>
                <td class="cKoll100" contenteditable="true" oninput="saveEdit(this)">${
                  substance.cKoll100
                }</td>
                <td class="quantity input" contenteditable="true" oninput="saveEdit(this)">
                  <input contenteditable="true" type="number" value="${
                    substance.quantity
                  }">
                </td>
                <td class="sizeClass" contenteditable="true" oninput="saveEdit(this)">${
                  substance.sizeClass
                }</td>
                <td class="cellvolume" contenteditable="true" oninput="saveEdit(this)">${
                  substance.cellvolume
                }</td>
                <td class="group" contenteditable="true" oninput="saveEdit(this)">${
                  substance.group
                }</td>
                <td class="alt1" contenteditable="true" oninput="saveEdit(this)">${
                  substance.alt1
                }</td>
                <td class="alt2" contenteditable="true" oninput="saveEdit(this)">${
                  substance.alt2
                }</td>
                <td> <svg aria-hidden="true" data-prefix="fas" data-icon="minus-circle" class="svg-inline--fa fa-minus-circle fa-w-16 pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onclick="removeOld(${
                  substance.id
                })"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"></path></svg></td>
              </tr>`
            })
            .join('')}
            </tbody>
            <tfoot>
              <th class="pointer" colspan="13" onClick="addNew()">
              <svg aria-hidden="true" data-prefix="fas" data-icon="plus-circle" class="svg-inline--fa fa-plus-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
                <span>Add Row(s) </span>
                <input id="number" type="number" value="1" class="addNewRowInput" onClick="event.stopPropagation()">
              </th>
            </tfoot>
        </table>`

  root.innerHTML = html
  save('substances', substanceS)
  save('columnData', columnData)
}

function saveEdit(e) {
  const substance = substanceS.find(
    (sub) => sub.id == e.parentElement.dataset.id
  )

  const input = e.querySelector('input') // check if cell element has an <input>

  const attribute = e.classList[0] // class names must == Substance property
  substance[attribute] = input ? input.value : e.innerHTML // <input> vs. cell

  save('substances', substanceS)
}

function saveColumnData(e) {
  const alternative = e.classList.value
  if (alternative === 'alt1') {
    columnData.alt1 = e.innerHTML
  } else if (alternative === 'alt2') {
    columnData.alt2 = e.innerHTML
  }

  save('columnData', columnData)
}

/**
 * Hotkeys
 */
function assignHotkey(id) {
  const currentElem = document.querySelector(`[data-id='${id}']`)
  currentElem.querySelector('.tallyKey').innerText = 'select key'

  window.removeEventListener('keyup', settingHotkey)
  window.addEventListener(
    'keyup',
    (e) => {
      settingHotkey(id, e)
    },
    { once: true }
  )
  window.removeEventListener('keydown', runHotkey)
}

function settingHotkey(id, e) {
  e.preventDefault()

  const keyCombo = getKeyCombo(e)

  const otherSubstance = substanceS.find(
    (sub) => JSON.stringify(sub.tallyKey) === JSON.stringify(keyCombo)
  )

  // If another substance already has the keyCombo replace its
  if (otherSubstance) otherSubstance.tallyKey = null

  const substance = substanceS.find((sub) => sub.id === id)
  substance.tallyKey = keyCombo

  render()
  window.addEventListener('keydown', runHotkey)
}

function runHotkey(e) {
  // Don't run on input
  if (e.target.contentEditable === 'true') return

  e.preventDefault()

  const keyCombo = getKeyCombo(e)

  const substance = substanceS.find(
    (sub) => JSON.stringify(sub.tallyKey) === JSON.stringify(keyCombo)
  )

  // If hotkey exists
  if (!substance) return
  increment(substance)
}

function getKeyCombo(e) {
  let key = String.fromCharCode(e.keyCode)

  // Special characters
  switch (e.keyCode) {
    case 221:
      key = 'Å'
      break
    case 222:
      key = 'Ä'
      break
    case 192:
      key = 'Ö'
      break
    case 32:
      key = 'SPACE'
      break
  }

  return {
    key: key,
    alt: e.altKey,
    ctrl: e.ctrlKey,
    shift: e.shiftKey,
  }
}

/**
 * save & load - file
 */
function saveToFile() {
  // update tallyCounter
  tallyCounter = {
    substances: substanceS,
    columnData: columnData,
  }

  const data = JSON.stringify(tallyCounter)
  const a = document.createElement('a')
  const file = new Blob([data], { type: 'application/json' })

  a.href = URL.createObjectURL(file)
  // Save filename or cancel
  a.download = prompt('Ange namn på filen', 'filnamn')
  if (a.download === 'null') return
  a.click()
}

function initLoadFromFile() {
  const reader = new FileReader()
  const fileInput = document.querySelector('#fileInput')

  fileInput.addEventListener('change', fileInputChange)

  function fileInputChange() {
    // Only allow .json
    if (fileInput.files[0].type !== 'application/json') {
      alert('Fel filtyp!')
      return
    }
    // Check if file uploaded pre reader run
    if (fileInput.files.length > 0)
      reader.readAsBinaryString(fileInput.files[fileInput.files.length - 1])
  }

  reader.onload = function () {
    try {
      tallyCounter = JSON.parse(decodeURIComponent(escape(reader.result))) // decode UTF8 and parse result
      substanceS = tallyCounter.substances
      columnData = tallyCounter.columnData
      render()
      location.reload()
    } catch (error) {
      alert('Ett fel inträffade')
      console.log(error)
    }
  }
}

function loadFromFile() {
  const fileInput = document.querySelector('#fileInput')
  fileInput.click()
}

/**
 * Aside buttons
 */
function save(key, value) {
  try {
    const data = JSON.stringify(value)
    localStorage.setItem(key, data)
  } catch (error) {
    console.error('CANT SAVE', error)
  }
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.error('CANT LOAD', error)
  }
}

function exportExcel() {
  let filename
  // Save filename or cancel
  filename = prompt('Ange namn på filen', 'filnamn')
  if (!filename) return
  filename += '.csv'

  const delimiter = ';'
  let csv = `\ufeffMagn x${delimiter}Count part${delimiter}Species${delimiter}C/kol/100µ${delimiter}No count${delimiter}Size class${delimiter}Cell vol µm3${delimiter}Group${delimiter}${columnData.alt1}${delimiter}${columnData.alt2}\r\n`

  csv += substanceS
    .map(
      (substance) =>
        `${
          substance.magnification +
          delimiter +
          substance.countPart +
          delimiter +
          substance.species +
          delimiter +
          substance.cKoll100 +
          delimiter +
          substance.quantity +
          delimiter +
          substance.sizeClass +
          delimiter +
          substance.cellvolume +
          delimiter +
          substance.group +
          delimiter +
          substance.alt1 +
          delimiter +
          substance.alt2
        }\r\n`
    )
    .join('')

  const blob = new Blob([csv], { type: 'text;charset=UTF-8;' })
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

function resetTable() {
  if (confirm('Är du säker på att du vill återställa tabellen?')) {
    localStorage.clear()
    location.reload()
  }
}

function resetQuantityColumn() {
  if (confirm('Är du säker på att du vill återställa antal-kolumnen?')) {
    substanceS.forEach((substance) => {
      substance.quantity = 0
    })
    render()
  }
}
