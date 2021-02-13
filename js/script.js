document.querySelectorAll('.project').forEach((project) => {
  const url = project.querySelector('a').getAttribute('href')

  project.addEventListener('click', () => {
    url.startsWith('http') ? window.open(url) : (window.location = url)
  })
})
