document.querySelector('#input').addEventListener('keyup', handleEvent)

function handleEvent(e) {
  if (e.type === 'submit') e.preventDefault()

  const input = document.querySelector('#input').value
  handleInput(input)
}

function handleInput(input) {
  const op = input.includes('-') ? '-' : '+'
  const parameters = input.split(op).map((s) => s.trim())

  let result
  if (parameters.some((parameter) => /h|m|s/.test(parameter))) {
    result = computeTimeStroke(parameters, op)
  } else {
    result = computeElapsedTime(parameters)
  }

  const resultElement = document.querySelector('#result')
  resultElement.innerHTML = result
}

const mod = (n, m) => ((n % m) + m) % m
const overflow = (t) => t < 0 || t > 60

const computeTimeStroke = (parameters, op) => {
  const [first, second] = parameters
  const c = op === '+' ? 1 : -1

  const [HOUR = 0, MINUTE = 0, SECOND = 0] = first.split(':')
  const regxp = /(?<hours>\d+(?=h))?h?(?<minutes>\d+(?=m))?m?(?<seconds>\d+(?=s))?/i
  const match = regxp.exec(second)
  const { hours = 0, minutes = 0, seconds = 0 } = match.groups

  const TIME = {}
  TIME.second = eval(`${SECOND}${op}${seconds}`)
  TIME.minute = eval(`${MINUTE}${op}${minutes}`) + (overflow(TIME.second) && c)
  TIME.hour = eval(`${HOUR}${op}${hours}`) + (overflow(TIME.minute) && c)
  TIME.second = mod(TIME.second, 60)
  TIME.minute = mod(TIME.minute, 60)
  TIME.hour = mod(TIME.hour, 24)

  const [s, m, h] = Object.values(TIME).map((t) => (t < 10 ? `0${t}` : t))
  return `${h}:${m}` + (s === '00' ? '' : `:${s}`)
}

const computeElapsedTime = (parameters) => {
  const [first, second] = parameters

  const end = first.split(':')
  const start = second.split(':')

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
  return h + m + s
}
