// this class is used for player and background and fruites images and animations

class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 6, scale = 1, frameLoop = true }) {
        this.position = position
        this.image = new Image()
        this.loaded = false
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0

        this.scale = scale
        this.frameLoop = frameLoop
        this.play = true
    }


    update() {
        this.draw()
    }
    draw() {
        if (!this.image) {
            return
          
        }

        const cropBox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x ,this.position.y , this.width , this.height)

        c.drawImage(this.image
            , cropBox.position.x
            , cropBox.position.y
            , cropBox.width
            , cropBox.height
            , this.position.x
            , this.position.y
            , this.width,
            this.height)
    }







    playAnimation(){
        this.play = true
    }
}
