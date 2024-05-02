class Player extends Sprite {
    constructor({ position, velocity, floorBorderBlocksObjects, platformBlocksObjects, imageSrc, frameRate, frameBuffer, scale = 1, animations, fruitsObjects, monstersObjects, levelMenu }) {
        // the player is an image with functionallity to move and collide with objects
        super({ position, imageSrc, frameRate, frameBuffer, scale })
        this.velocity = velocity

        // objects to detect with
        this.floorBorderBlocksObjects = floorBorderBlocksObjects
        this.platformBlocksObjects = platformBlocksObjects
        this.hitDamage = false
        this.hitDamageDelay = 0
        this.enableMove = true
        this.enableMoveDelay = 0

        //^ generate images for each animation sprite
        // each object has diffrent of sprite animaations ... we make image for those sprite animations
        this.animations = animations
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
        }
    }
    hitBox = {
        position: {
            x: this.position.x + 6,
            y: this.position.y + this.height - 27
        },
        width: 22,
        height: 27
    }

    update() {
        this.updateFrame()
        this.updateHitBox()




        // c.fillStyle = 'rgba(0 , 0 ,255 , 0.4)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'rgba(0, 255, 0, .5)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)


        // console.log(this.velocity.y)
        this.draw()
        // console.log(this.enableMove)
        // console.log(this.hitDamage)
        this.position.x += this.velocity.x
        this.checkFruitsCollision()

        if (this.hitDamage === false) {
            // this.checkMonsterCollisionFromTop()
            // this.checkMonsterCollisionFromLeftAndRight()
        }
        else {
            this.hitDamageDelay++
            this.enableMoveDelay++
            this.updatePlayerState()
        }
        this.updateHitBox()
        this.checkForHorozontalCollision()
        this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollision()



        // console.log(Object.is(monstersObjects, this.monstersObjects))


    }
    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
        // falling
        if (this.velocity.y > 0.4) {
            if (lastDirection === 'right') {
                this.switchAnimation("FallRight")
            }
            else {
                this.switchAnimation("FallLeft")
            }
        }


    }
    checkForVerticalCollision() {
        //floorborder collision
        for (let i = 0; i < BORDERBLOCKS.length; i++) {
            const block = BORDERBLOCKS[i]
            if (
                collide({
                    object1: this.hitBox,
                    object2: block
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = block.position.y - offset - 0.01
                    //player on the floor after falling
                    keys.w.pressed = false
                    keys.w.double = false
                    if (lastDirection === 'right' && this.velocity.x === 0) {
                        this.switchAnimation("IdleRight")
                    }
                    else if (lastDirection === 'left' && this.velocity.x === 0) {
                        this.switchAnimation("IdleLeft")
                    }
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = block.position.y + block.height - offset + 0.01
                }
            }
        }
        // platform collioin
        for (let i = 0; i < PLATFORMBLOCKS.length; i++) {
            const block = PLATFORMBLOCKS[i]
            if (
                platformCullide(
                    {
                        object1: this.hitBox,
                        object2: block
                    }
                )
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = block.position.y - offset - 0.01
                    // player on the platform after falling
                    keys.w.pressed = false
                    keys.w.double = false
                    if (lastDirection === 'right' && this.velocity.x === 0) {
                        this.switchAnimation("IdleRight")
                    }
                    else if (lastDirection === 'left' && this.velocity.x === 0) {
                        this.switchAnimation("IdleLeft")
                    }
                }
            }
        }
    }












    checkForHorozontalCollision() {
        for (let i = 0; i < BORDERBLOCKS.length; i++) {
            const block = BORDERBLOCKS[i]
            if (
                collide(
                    {
                        object1: this.hitBox,
                        object2: block
                    }
                )

            ) {
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitBox.position.x - this.position.x
                    this.position.x = block.position.x + block.width - offset + 0.01

                }
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = block.position.x - offset - 0.01
                }
            }
        }
    }


    checkFruitsCollision() {
        for (let i = 0; i < FRUTIS.length; i++) {
            const fruit = FRUTIS[i]
            if (
                collide(
                    {
                        object1: this.hitBox,
                        object2: fruit.hitBox
                    }
                )

            ) {

                // console.log((fruit.image.src.includes("Collected")))
                if (!fruit.image.src.includes("Collected")) {
                    LEVELSTATE.decreaseFrutisNumber()
                    //this.updateLevelMenuData()
                    // console.log(this.levelMenu)
                    // =
                    // console.log(levelState)
                    // they still the same refrence ... because we are not using a new assigning to them 

                }
                fruit.switchAnimation('Collected')
            }
        }
    }







 






    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 6,
                y: this.position.y + this.height - 27
            },
            width: 22,
            height: 27
        }
    }
    switchAnimation(key) {
        if (!this.loaded || this.image === this.animations[key].image) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = this.animations[key].frameBuffer
    }


    updatePlayerState() {

        if (this.hitDamageDelay % 50 === 0) {
            this.hitDamage = false
        }
        if (this.enableMove % 10 === 0) {
            this.enableMove = true
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
        }
        this.elapsedFrames++
    }





}



// applyGravity()
// check for verticalcollision
// check for horziontalcollision