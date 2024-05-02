class Gate extends Sprite {
    constructor({ position, width = 20, height = 20, imageSrc, frameRate, frameBuffer, scale = .9 ,  frameLoop   }) {
        super({ position, imageSrc, frameRate, frameBuffer, scale , frameLoop  })
        this.scale = scale

        this.width = width 
        this.height = height





        this.hitBox = {
            position: {
                x: this.position.x +20,
                y:this.position.y + 10
            },
            width: 16 ,
            height: 20
        }



    }
    update() {
        // c.fillStyle = 'rgba(0 , 255 , 0 , 0.6)'
        // c.strokeStyle = 'blue';
        // c.lineWidth = 2;
        // c.strokeRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'rgba(0 , 0 , 255, 0.5)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)


        this.updateFrame()
        this.updateHitBox()
        this.draw()
        this.checkPlayerCollide()
    }


    checkPlayerCollide(){
        if (
            collide({
                object1: PLAYER,
                object2: this.hitBox
            }) && LEVELSTATE.opendGate === true && PLAYER.velocity.y <= 0.2 && PLAYER.velocity.y >= 0) {
    
            c.fillStyle = "black"
            c.fillRect(120, (canvas.height / 4) - 30, 300, 45)
    
    
            c.font = 'bold 30px Arial';
            c.fillStyle = 'white'
            c.fillText('Press E to Enter', 150, canvas.height / 4);
        }
    }






    updateHitBox(){
        this.hitBox = {
            position: {
                x: this.position.x +20,
                y:this.position.y + 10
            },
            width: 16 ,
            height: 20
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
            }
        }
        this.elapsedFrames++
    }


}