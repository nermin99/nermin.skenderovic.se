const handleSubmit = (e) => {
  e.preventDefault()

  const input = document.querySelector('#input').value
  calculateTime(input)
}

const calculateTime = (input) => {
  const [end, start] = input.split('-').map((t) => t.split(':'))

  let [HOUR, MIN = 0, SEC = 0] = end
  const endDate = new Date(0, 0, 0, HOUR, MIN, SEC)
  ;[HOUR, MIN = 0, SEC = 0] = start
  const startDate = new Date(0, 0, 0, HOUR, MIN, SEC)

  let delta = endDate.getTime() - startDate.getTime()

  const hours = Math.floor(delta / 1000 / 60 / 60) // ms -> s -> min -> h
  delta -= hours * 1000 * 60 * 60
  const minutes = Math.floor(delta / 1000 / 60) // ms -> s -> min
  delta -= minutes * 1000 * 60
  const seconds = Math.floor(delta / 1000) // ms -> s

  const resultElement = document.querySelector('#result')
  resultElement.innerHTML =
    `${hours} hours ${minutes} min` + (seconds !== 0 ? ` ${seconds} sec` : '')
}
