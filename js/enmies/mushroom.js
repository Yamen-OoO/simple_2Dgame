class Mushroom extends Monster {
    constructor({ index, position, velocity, width, height, direction, imageSrc, frameRate = 1, frameBuffer = 1, frameLoop = true, animations, scale = 1, movments, stopMovmentsDelay, hitDamage = false, attackDamageValue, hearts }) {
        super({ index, position, velocity, width, height, direction, imageSrc, frameRate, frameBuffer, frameLoop, animations, imageSrc, movments, scale, hitDamage, attackDamageValue, hearts, stopMovmentsDelay })



    }
    hitBox = {
        position: {
            x: this.position.x,
            y: this.position.y + 10
        },
        width: this.width * this.scale,
        height: this.height
    }
    tophitBox = {
        position: {
            x: this.position.x,
            y: this.position.y + 5
        },
        width: this.width * this.scale,
        height: 6
    }


    update() {

        this.position.x += this.velocity.x
        this.delayTimer++ // when player while walking jump above it and to stop at start and end of the road

        c.fillStyle = 'rgba(244 , 200 , 0 ,0.6)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(200, 0 , 0 ,1)'
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        c.fillStyle = 'rgba(10, 0 , 0 ,0.4)'
        c.fillRect(this.tophitBox.position.x, this.tophitBox.position.y, this.tophitBox.width, this.tophitBox.height)
        this.draw()
        if(PLAYER.hitDamage === false){
            this.checkMonsterCollisionFromLeftAndRight()
            this.checkMonsterCollisionFromTop()
        }

        this.updateFrame()
        this.updateHitBox()
        this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollision()
        this.monsterMoveLeftAndRight()
    }




    monsterMoveLeftAndRight() {
        this.checkEndRoundCollison()
    }


    checkEndRoundCollison() {
        if (this.hitDamage === true) {
            return
        }


        // stop for stopMovmentsDelay = 300 wait then go back
        if (this.position.x + this.width >= this.movments.end && this.hitDamage === false) {
            this.velocity.x = 0
            this.switchAnimation("IdleRight")
            this.lastStateBeforeGetDamage = "IdleRight"

            if (this.delayTimer % this.stopMovmentsDelay === 0) {
                this.switchAnimation("RunLeft")
                this.lastStateBeforeGetDamage = "RunLeft"
                this.direction = 'left'
                this.velocity.x = -1
                this.delayTimer = 0
            }
        }
        else if (this.position.x <= this.movments.start && this.hitDamage === false) {
            this.velocity.x = 0
            this.switchAnimation("IdleLeft")
            this.lastStateBeforeGetDamage = "IdleLeft"

            if (this.delayTimer % this.stopMovmentsDelay === 0) {
                this.switchAnimation("RunRight")
                this.lastStateBeforeGetDamage = "RunRight"
                this.direction = 'right'
                this.velocity.x = 1
                this.delayTimer = 0
            }
        }
        else {
            if (this.direction === 'right') {
                this.switchAnimation("RunRight")
                this.lastStateBeforeGetDamage = "RunRight"
                this.direction = 'right'
                this.velocity.x = 1
                this.delayTimer = 0
            }
            else {
                this.switchAnimation("RunLeft")
                this.lastStateBeforeGetDamage = "RunLeft"
                this.direction = 'left'
                this.velocity.x = -1
                this.delayTimer = 0
            }
        }
    }



    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 1,
                y: this.position.y + 10
            },
            width: this.width * this.scale,
            height: 18
        }
        this.tophitBox = {
            position: {
                x: this.position.x,
                y: this.position.y + 5
            },
            width: this.width * this.scale,
            height: 6
        }
    }

    checkMonsterCollisionFromTop() {
        // console.log(monstersObjects)
        let monsterLastDirection = this.direction
        // let monsterHearts = monster.hearts
        if (
            monsterCollideFromTop(
                {
                    object1: PLAYER.hitBox,
                    object2: this.tophitBox,
                    velocity: PLAYER.velocity.y
                }
            )
        ) {
            PLAYER.velocity.y = -4
            this.hitDamage = true
            this.hearts--

            if (this.hearts === 0) {
                LEVELSTATE.decreaseMonstersNumber()
            }


            if (Math.random() > 0.5) {
                if (lastDirection === 'right') {
                    PLAYER.switchAnimation("DoubleJumpRight")
                }
                else {
                    PLAYER.switchAnimation("DoubleJumpLeft")
                }
            }
            if (monsterLastDirection === 'right') {
                this.switchAnimation('HitRight')
            }
            else if (monsterLastDirection === 'left') {
                this.switchAnimation('HitLeft')
            }
        }
    }



    checkMonsterCollisionFromLeftAndRight() {
        let monsterLastDirection = this.direction
        let monsterStartRoad = this.movments.start
        let monsterEndRoad = this.movments.end
        let damageResponseDirection

        if (PLAYER.position.x <= (monsterEndRoad + monsterStartRoad) / 2) {
            damageResponseDirection = 'right'
        }
        else if (PLAYER.position.x >= (monsterEndRoad + monsterStartRoad) / 2) {
            damageResponseDirection = 'left'
        }

        if (
            monsterCollideFromLeftAndRight(
                {
                    object1: PLAYER.hitBox,
                    object2: this.hitBox,
                    velocity: PLAYER.velocity.y
                }
            )
        ) {
            PLAYER.hitDamage = true
            PLAYER.enableMove = false
            let damageValue = this.attackDamageValue
            LEVELSTATE.decreaseHeart(damageValue)

            if (damageResponseDirection === 'right') {
                PLAYER.switchAnimation('HitRight')
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = 2
                PLAYER.position.x += PLAYER.velocity.x
            }
            else {
                PLAYER.switchAnimation('HitLeft')
                PLAYER.velocity.y = -5
                PLAYER.velocity.x = -2
                PLAYER.position.x += PLAYER.velocity.x
            }
        }
    }




    updateStateAfterTheDamage() {

        this.hitDamage = false
        this.currentFrame = 0
        this.frameLoop = true
    }

    switchAnimation(key) {
        if (!this.loaded || this.image === this.animations[key].image) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = 4
        if (key === "HitRight" || key === "HitLeft" || key === "Hit") {
            this.frameLoop = false
            this.frameBuffer = 2
        }
        // else if ((key === "HitRight" || key === "HitLeft") && this.hearts === 0) {
        //     this.frameLoop = false
        //     this.frameBuffer = 2
        // }
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
                if (this.hearts === 0) { // decrease monster number from menu (monster is dead)
                    console.log('tetstt')
                    this.removeFromArray()

                } else if (this.hearts !== 0 ) { // monster update state after hitdamage
                    this.updateStateAfterTheDamage()

                }
            }

        }
        this.elapsedFrames++
    }
    removeFromArray() {
        MONSTERS = MONSTERS.filter(obj => obj.index !== this.index)
        // console.log(monstersObjects)
    }


    // for mashroom only
}