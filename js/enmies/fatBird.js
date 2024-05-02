class FatBird extends Monster {
    constructor({ index, position, velocity, width, height, direction, imageSrc, frameRate = 1, frameBuffer = 1, frameLoop = true, animations, scale = 1, movments, stopMovmentsDelay, hitDamage = false, attackDamageValue, hearts, dangerousArea = 100 ,floorDistance }) {
        super({ index, position, velocity, width, height, direction, imageSrc, frameRate, frameBuffer, frameLoop, animations, imageSrc, movments, scale, hitDamage, attackDamageValue, hearts, stopMovmentsDelay, floorDistance })
        this.index = index
        this.position = position
        this.velocity = velocity
        this.scale = scale
        this.width = width * this.scale
        this.height = height * this.scale
        this.animations = animations
        this.stopMovmentsDelay = stopMovmentsDelay
        this.hitDamage = hitDamage
        this.direction = direction
        this.floorDistance = floorDistance
        this.dangerousAreaRange = dangerousArea
        this.movments = movments
        this.attackDamageValue = attackDamageValue
        this.hearts = hearts
        this.lastStateBeforeGetDamage


        this.color = 'red'
        this.delayTime = 0
        this.attacking = false
        this.isGoingToTop = false


        this.dangerousArea = {
            position: {
                x: this.position.x,
                y: this.position.y + this.height
            },
            width: this.width,
            height: this.dangerousAreaRange
        };
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y + 15
            },
            width: this.width * this.scale,
            height: this.height
        }
        this.tophitBox = {
            position: {
                x: this.position.x,
                y: this.position.y + 5
            },
            width: this.width * this.scale,
            height: 3
        }
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
            console.log(this.animations[key])
        }
        console.log(this.animations)
    }

    // draw() {
    // }

    update() {
        // console.log(PLAYER.velocity.x)
        // console.log(this.hitDamage)
        // console.log(this.index)
        // console.log(this.position.y + this.height)
        // c.fillStyle = this.color
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // c.fillStyle = 'rgba(0 , 0 , 100 , 0.5)'
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        // c.fillStyle = 'blue'
        // c.fillRect(this.tophitBox.position.x, this.tophitBox.position.y, this.tophitBox.width, this.tophitBox.height)

        // c.fillStyle = 'rgba(0, 255, 0, 0.6)';
        // c.fillRect(this.dangerousArea.position.x, this.dangerousArea.position.y, this.dangerousArea.width, this.dangerousArea.height);
        // console.log(this.delayTime)
        this.position.y += this.velocity.y
        // console.log(this.frameLoop)
        this.updateFrame()
        this.draw();
        this.updateBoxes();
        this.checkPlayerCollideWithDangerousArea()
        this.checkForVerticalCollision()
        if (PLAYER.hitDamage === false && this.hitDamage === false) {
            this.checkMonsterCollisionFromLeftBottomRight()
        }
        if (this.hitDamage === false) {
            this.checkMonsterCollisionFromTop()
        }


        if (this.attacking) {
            this.attack()
        }
        else if (this.stopMovments) {
            this.switchAnimation('Ground')
            this.runDelayTime()
            if (this.delayTime % this.stopMovmentsDelay === 0) {
                this.isGoingToTop = true
                this.attacking = false
                this.stopMovments = false
                this.delayTime = 0
            }
        }
        else if (this.isGoingToTop) {
            this.goTop()
        } else {
            this.monsterMovements()
        }
        this.checkForVerticalCollision()

    }

    updateBoxes() {
        this.dangerousArea = {
            position: {
                x: this.position.x,
                y: this.position.y + this.height
            },
            width: this.width,
            height: this.dangerousAreaRange
        };
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.width,
            height: this.height
        }
        this.tophitBox = {
            position: {
                x: this.position.x,
                y: this.position.y - 5
            },
            width: this.width,
            height: 5
        }
    }
    checkPlayerCollideWithDangerousArea() {
        if (
            collide({
                object1: PLAYER,
                object2: this.dangerousArea
            })
        ) {
            // console.log('colllide')
            this.attacking = true
        }
    }


    checkMonsterCollisionFromTop() {
        if (
            monsterCollideFromTop(
                {
                    object1: PLAYER,
                    object2: this.tophitBox,
                    velocity: PLAYER.velocity.y
                }
            )
        ) {
            // to enabale the hit response 
            PLAYER.hitDamage = true
            PLAYER.enableMove = false
            this.hitDamage = true
            this.switchAnimation("Hit")
            this.hearts--


            if (lastDirection === 'right') {
                PLAYER.switchAnimation("DoubleJumpRight")
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = -.8
                PLAYER.position.x += PLAYER.velocity.x
            }
            else {
                PLAYER.switchAnimation("DoubleJumpLeft")
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = .8
                PLAYER.position.x += PLAYER.velocity.x
            }


            if (this.hearts === 0) {
                LEVELSTATE.decreaseMonstersNumber()
            }

        }
    }
    checkMonsterCollisionFromLeftBottomRight() {
        if (
            collide(
                {
                    object1: PLAYER,
                    object2: this.hitBox,
                }
            )
        ) {
            PLAYER.hitDamage = true
            PLAYER.enableMove = false
            let damageValue = this.attackDamageValue
            LEVELSTATE.decreaseHeart(damageValue)


            if (lastDirection === 'right') {
                PLAYER.switchAnimation('HitLeft')
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = -1
                PLAYER.position.x += PLAYER.velocity.x
            }
            else {
                PLAYER.switchAnimation('HitRight')
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = 1
                PLAYER.position.x += PLAYER.velocity.x
            }
        }
    }




    attack() {
        this.switchAnimation("Fall")
        this.position.y += .7
        if (this.position.y + this.height + this.velocity.y + gravity >= this.floorDistance) {
            this.velocity.y = 0
            this.position.y = this.floorDistance - this.height
            this.attacking = false
            this.color = 'green'
            this.stopMovments = true
        }
        else {
            this.velocity.y += gravity
        }
    }
    goTop() {
        this.velocity.y = -.5
        this.color = 'red'
        this.position.y += this.velocity.y
        if (this.position.y + this.velocity.y <= this.movments.start + 20) {
            // this.velocity.y = 0
            // this.position.y = 100
            this.isGoingToTop = false
        }
    }
    runDelayTime() {
        this.delayTime += 1
    }
    monsterMovements() {
        if (this.position.y + this.height > this.movments.end) {
            // console.log('go top')
            this.velocity.y = -.5
        }
        else if (this.position.y + this.height < this.movments.start) {
            // console.log('go down')
            this.velocity.y = .5
        }
    }

    updateStateAfterTheDamageOrFall() {
        this.hitDamage = false
        this.currentFrame = 0
        this.switchAnimation("Idle")
    }

    switchAnimation(key) {
        if (!this.loaded || this.image === this.animations[key].image) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameLoop = true
        this.frameBuffer = 3
        if (key === "Ground" || key === "Hit") {
            this.frameLoop = false
            this.frameBuffer = 10
        }
        else if (key === "Hit") {
            this.frameLoop = false

            this.frameBuffer = 5
            // if(this.hearts === 0) this.removeFromArray()
        }

    }


    updateFrame() {
        // frameLoop by default is true or we change it to false if our frameloop once like monster hit or on the ground
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            }
            else if (this.frameLoop === true) {
                this.currentFrame = 0
            }
            else if (this.frameLoop === false) {
                if (this.hearts === 0) {
                    this.removeFromArray()
                }
                this.updateStateAfterTheDamageOrFall()
            }
        }
        this.elapsedFrames++
    }


    removeFromArray() {
        MONSTERS = MONSTERS.filter(obj => obj.index !== this.index)
        console.log(MONSTERS)
    }



}