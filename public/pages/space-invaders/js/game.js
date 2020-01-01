// #1 https://stackoverflow.com/questions/11452022/measure-text-height-on-an-html5-canvas-element

import Entity from './model.js'
import Explosion from './animation.js'

const shipImg = new Image()
const shotImg = new Image()
const alienImg = new Image()
const explosionImg = new Image()

shipImg.src = 'images/ship.png'
shotImg.src = 'images/shot.png'
alienImg.src = 'images/alien.png'
explosionImg.src = 'images/explosion/explosion-sprite.png'

let ctx
let canvas
let points
let level = 1
let ship, shot
const alienArray = []
const active = true
const keysDown = []
let lastUpdateTime
let gameRunning = true
const isRemovable = false
const hitSound = new Audio('sound/fire.mp3')
const shotSound = new Audio('sound/pew.mp3')
const winSound = new Audio('sound/victory.mp3')
const fail1Sound = new Audio('sound/fail.mp3')
const fail2Sound = new Audio('sound/fail_2.mp3')

let nX = 1
let nY = 1
const gap = 20 // 2D gap between aliens
const canvasWidth = 800
const canvasHeight = 600
let shotSpeed = canvasHeight / 600 * 500 // k * px/s
let shipSpeed = canvasWidth / 800 * 400 // k * px/s
let alienSpeed = canvasHeight / 600 * 80 // k * px/s

function init() {
  winSound.load()
  fail1Sound.load()
  fail2Sound.load()

  points = 0

  addEventListener('keydown', keyDown)
  addEventListener('keyup', keyUp)

  canvas = document.getElementById('gameCanvas')
  ctx = canvas.getContext('2d')

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  loadObjects()
}

function loadObjects() {
  const xShip = (canvasWidth - shipImg.width) / 2
  const yShip = canvasHeight - shipImg.height - gap / 2
  ship = new Entity(xShip, yShip, shipImg, shipSpeed, active)

  for (let x = 0; x < nX; x++) {
    for (let y = 0; y < nY; y++) {
      const d = (canvasWidth - (nX * alienImg.width + (nX - 1) * gap)) / 2
      alienArray.push(new Entity(x * (alienImg.width + gap) + d, y * (alienImg.height + gap), alienImg, alienSpeed, active))
    }
  }

  lastUpdateTime = Date.now()
  gameLoop()
}

function gameLoop() {
  const deltaTime = Date.now() - lastUpdateTime

  update(deltaTime / 1000)
  if (gameRunning) {
    render()
  }

  lastUpdateTime = Date.now()

  requestAnimationFrame(function () {
    if (gameRunning) {
      gameLoop()
    }
  })
}

function update(deltaTime) {
  // mellanslag = skjut
  if (32 in keysDown) {
    fire()
  }

  // vänster
  if (37 in keysDown) {
    moveLeft(deltaTime)
  }

  // höger
  if (39 in keysDown) {
    moveRight(deltaTime)
  }

  checkCollisionAndRemove()

  if (shot != null) {
    if (shot.y + shotImg.height <= 0) {
      shot = null
    } else {
      shot.y -= shot.speed * deltaTime
    }
  }

  for (let i = 0; i < alienArray.length; i++) {
    alienArray[i].y += alienArray[i].speed * deltaTime
    alienArray[i].x += 2 * Math.sin(alienArray[i].y) * alienArray[i].speed * deltaTime
  }
}

function render(text, color) {
  ctx.save()

  // Background
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw aliens & animation
  for (let i = 0; i < alienArray.length; i++) {
    if (alienArray[i].active) {
      ctx.drawImage(alienArray[i].img, alienArray[i].x, alienArray[i].y)
    } else {
      ctx.drawImage(explosionImg, alienArray[i].getSrcX(), 0, alienArray[i].frameWidth, alienArray[i].frameHeight, alienArray[i].x, alienArray[i].y, alienArray[i].frameWidth, alienArray[i].frameHeight)
    }
  }

  // Draw shot
  if (shot != null) {
    ctx.drawImage(shot.img, shot.x, shot.y)
  }

  // Draw ship
  ctx.drawImage(ship.img, ship.x, ship.y)

  // Statistik
  ctx.fillStyle = 'yellow'
  ctx.font = '16px Arial'
  ctx.textBaseline = 'hanging'
  ctx.fillText('Eliminated: ' + points + '/' + nX * nY, 10, 10)
  const str = 'Level: '
  ctx.fillText(str + level, canvasWidth - ctx.measureText(str).width - 25, 10)

  // Eftertext
  if (!gameRunning) {
    ctx.fillStyle = color
    ctx.font = '100pt Arial'

    // #1
    const xPos = (canvasWidth - ctx.measureText(text).width) / 2
    const yPos = (canvasHeight - parseInt(ctx.font)) / 2
    ctx.fillText(text, xPos, yPos)
  }

  ctx.restore()
}

/* Hjälp-funktioner */

function fire() {
  if (shot == null) {
    shot = new Entity(ship.x + (shipImg.width - shotImg.width) / 2, ship.y, shotImg, shotSpeed)
    shotSound.load()
    shotSound.play()
  }
}

function moveLeft(deltaTime) {
  if (ship.x <= 0) {
    ship.x = 0
  } else {
    ship.x -= ship.speed * deltaTime
  }
}

function moveRight(deltaTime) {
  if (ship.x + ship.img.width >= canvas.width) {
    ship.x = canvas.width - ship.img.width
  } else {
    ship.x += ship.speed * deltaTime
  }
}

function checkCollisionAndRemove() {
  for (let i = 0; i < alienArray.length; i++) {
    if (gameRunning) {
      if (alienArray[i].active) {
        // Skott träffar alien
        if (shot != null) {
          if (intersects(shot, alienArray[i])) {
            shot = null
            alienArray[i].active = false
            alienArray[i] = new Explosion(alienArray[i].x, alienArray[i].y, explosionImg, alienArray[i].speed, alienArray[i].active, isRemovable)

            points++
            hitSound.load()
            hitSound.play()
            break
          }
        }

        // Alien träffar botten
        if (alienArray[i].y + alienImg.height > canvasHeight - 10 && gameRunning) {
          gameRunning = false
          shot = null
          render('Game Over', 'red')
          restart(false)

          fail2Sound.load()
          fail2Sound.play()
          break
        }

        // Ship träffar alien
        if (intersects(ship, alienArray[i]) && gameRunning) {
          gameRunning = false
          shot = null
          render('Game Over', 'red')
          restart(false)

          fail1Sound.load()
          fail1Sound.play()
          break
        }
      } else if (alienArray[i].active === false && alienArray[i].isRemovable) {
        alienArray.splice(i, 1)
      }
    }
  }

  // Alla aliens eliminerade
  if (alienArray.length === 0) {
    gameRunning = false
    shot = null
    render('You Win!', 'green')
    restart(true)

    winSound.load()
    winSound.play()
  }
}

function intersects(A, B) {
  const widthA = A.x + A.img.width
  const widthB = B.x + B.img.width
  const heightA = A.y + A.img.height
  const heightB = B.y + B.img.height

  //              overflow || intersect
  return ((widthB < B.x || widthB > A.x) &&
          (heightB < B.y || heightB > A.y) &&
          (widthA < A.x || widthA > B.x) &&
          (heightA < A.y || heightA > B.y))
}

function restart(roundWin) {
  removeEventListener('keydown', keyDown)
  addEventListener('keydown', listen)

  function listen(e) {
    // mellanslag
    if (e.keyCode === 32) {
      removeEventListener('keydown', listen)
      gameRunning = true
      levels(roundWin)
      init()
    }
  }
}

function levels(roundWin) {
  if (roundWin) {
    if (canvasWidth - (nX * alienImg.width + (nX - 1) * gap) > alienImg.width || nY * alienImg.height + nY * gap < ship.y - alienImg.height) {
      if (nX < 3) {
        nX++
      } else if (nY < 2) {
        nX--
        nY++
      } else if (nX < 6) {
        nX++
      } else if (nY < 3) {
        nX--
        nY++
      } else if (nX < 8) {
        nX++
      } else if (nY < 5) {
        nY++
        shotImg.src = 'images/missile.png' // Upgrade
      } else if (canvasWidth - (nX * alienImg.width + (nX - 1) * gap) > alienImg.width) {
        nX++
      } else if (nY * alienImg.height + nY * gap < ship.y - (alienImg.height + gap)) {
        nY++
      }
    }
    shotSpeed += 200
    shipSpeed += 100 * Math.pow(0.9996, shipSpeed)
    alienSpeed *= 0.88
    level++
  } else {
    level = 1
    nX = 1
    nY = 1
    shotSpeed = canvasHeight / 600 * 500 // px/s
    shipSpeed = canvasWidth / 800 * 400 // px/s
    alienSpeed = canvasHeight / 600 * 80 // px/s
  }
}

function keyDown(e) {
  keysDown[e.keyCode] = true
}

function keyUp(e) {
  delete keysDown[e.keyCode]
}

window.addEventListener('load', init)
