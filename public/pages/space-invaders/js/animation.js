// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
// https://www.simplifiedcoding.net/javascript-sprite-animation-tutorial-html5-canvas/
// https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099

export default class Explosion {
  constructor(x, y, img, speed, active, isRemovable) {
    this.x = x
    this.y = y
    this.img = img
    this.speed = speed
    this.active = active
    this.isRemovable = isRemovable

    // Sprite-properties
    this.rows = 3
    this.cols = 5
    this.frameWidth = this.img.width / this.cols
    this.frameHeight = this.img.height / this.rows
    this.srcX = 0
    this.srcY = 0
    this.curFrame = 0
    this.frameCount = 5
    this.lastUpdateTime = Date.now()
  }

  // Updates the frame's x-value
  updateFrame() {
    this.curFrame++
    this.srcX = this.curFrame * this.frameWidth
  }

  // checks if animation is finished
  isFinished() {
    if (this.curFrame >= this.frameCount) {
      this.isRemovable = true
    }
  }

  // returns x-value for current frame
  getSrcX() {
    var deltaTime = (Date.now() - this.lastUpdateTime) / 1000
    if (deltaTime >= 0.05) {
      this.updateFrame()
      this.isFinished()
      this.lastUpdateTime = Date.now()
    }
    return this.srcX
  }
}
