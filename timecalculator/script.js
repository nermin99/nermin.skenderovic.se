const handleEvent = (e) => {
  if (e.type === 'submit') e.preventDefault()

  const input = document.querySelector('#input').value
  calculateTime(input)
}

const calculateTime = (input) => {
  const [end, start] = input.split('-').map((t) => t.split(':'))

  let [HOUR, MIN = 0, SEC = 0] = end
  const endDate = new Date(0, 0, 0, HOUR, MIN, SEC)
  ;[HOUR = 0, MIN = 0, SEC = 0] = start
  const startDate = new Date(0, 0, 0, HOUR, MIN, SEC)

  let delta = endDate.getTime() - startDate.getTime()

  const times = {}
  times.hour = Math.floor(delta / 1000 / 60 / 60) // ms -> s -> min -> h
  delta -= times.hour * 1000 * 60 * 60
  times.minute = Math.floor(delta / 1000 / 60) // ms -> s -> min
  delta -= times.minute * 1000 * 60
  times.second = Math.floor(delta / 1000) // ms -> s

  const [h, m, s] = Object.entries(times).map(([unit, t]) =>
    t === 0 ? '' : `${t} ${unit}${t === 1 ? '' : 's'} `
  )

  const resultElement = document.querySelector('#result')
  resultElement.innerHTML = h + m + s
}

document.querySelector('#input').addEventListener('keyup', handleEvent)
