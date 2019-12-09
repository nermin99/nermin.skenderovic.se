// http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
// https://www.simplifiedcoding.net/javascript-sprite-animation-tutorial-html5-canvas/
// https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099

function Explosion(x, y, img, speed, active, isRemovable) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speed = speed;
    this.active = active;
    this.isRemovable = isRemovable;
    
    // Sprite-properties
    var rows = 3;
    var cols = 5;
    this.frameWidth = this.img.width/cols;
    this.frameHeight = this.img.height/rows;

    this.srcX = 0;
    this.srcY = 0;
    this.curFrame = 0;
    this.frameCount = 5;

    var lastUpdateTime = Date.now();

    // Updates the frame's x-value
    this.updateFrame = function () {
        this.curFrame++;
        this.srcX = this.curFrame * this.frameWidth;
    }

    // checks if animation is finished
    this.isFinished = function () {
        if (this.curFrame >= this.frameCount) {
            this.isRemovable = true;
        }
    }

    // returns x-value for current frame
    this.getSrcX = function () {
        var deltaTime = (Date.now() - lastUpdateTime) / 1000;

        if (deltaTime >= 0.05) {
            this.updateFrame();
            this.isFinished();
            lastUpdateTime = Date.now();
        }

        return this.srcX;
    }
}