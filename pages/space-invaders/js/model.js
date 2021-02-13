/**
 * Allmänna egenskaper för figurer
 *
 * @param {double} x x-kordinat
 * @param {double} y y-kordinat
 * @param {Image} img Bild som representerar figuren
 * @param {int} speed Hastigheten i px/s
 */
export default class Entity {
  constructor(x, y, img, speed, active) {
    this.x = x
    this.y = y
    this.img = img
    this.speed = speed
    this.active = active
  }
}
