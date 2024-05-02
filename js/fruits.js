class Fruit extends Sprite {
    constructor({ position, width = 32, height = 32, imageSrc, frameRate, frameBuffer, scale = .9 , animations , frameLoop , fruitsIndex , collected  }) {
        super({ position, imageSrc, frameRate, frameBuffer, scale , frameLoop  })
        this.scale = scale

        this.width = width * this.scale
        this.height = height * this.scale
        this.collected = collected


        this.animations = animations
        for(let key in this.animations ){
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
        }



        this.hitBox = {
            position: {
                x: this.position.x + 8,
                y: this.position.y
            },
            width: 16 * this.scale,
            height: this.height * this.scale
        }


        this.fruitsIndex = fruitsIndex

    }
    update() {
        // c.fillStyle = 'rgba(0 , 255 , 0 , 0.6)'
        // c.strokeStyle = 'blue';
        // c.lineWidth = 2;
        // c.strokeRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'rgba(0 , 0 , 255, 0.5)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        this.updateFrame()
        this.draw()
    }
    switchAnimation(key) {
        if (!this.loaded || this.image === this.animations[key].image) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = 4
        if(key === "Collected") {
            this.frameLoop = false
            this.collected = true
        }
        
    }
    updateFrame() {
        // frameLoop by default is true or we change it to false if our frameloop once like monster hit and fruit collected
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            }



            // do this or this
            else if (this.frameLoop === true) {
                this.currentFrame = 0
                // this.hitDamage = false
            }
            // only for animation looped once like collected when animation is done
            else if (this.frameLoop === false) {
                if (this.collected === true) { // decrease fruits number from menu
                    this.removeFromArray()
                }
            }
        }
        this.elapsedFrames++
    }
   
    removeFromArray(){
        // remove fruit from the fruitesArray using filter
        FRUTIS = FRUTIS.filter(fruite => fruite.fruitsIndex !== this.fruitsIndex)
    }

}