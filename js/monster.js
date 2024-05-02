class Monster extends Sprite {
    constructor({ index, position, velocity, width, height, direction, imageSrc, frameRate = 1, frameBuffer = 1, frameLoop = true, animations, scale = 1, movments, stopMovmentsDelay, hitDamage = false, attackDamageValue, hearts, hitBox, topHitBox }) {
        super({ position, imageSrc, frameRate, frameBuffer, scale, frameLoop })

        //shared
        this.index = index
        this.position = position
        this.velocity = velocity
        this.scale = scale
        this.width = width * this.scale
        this.height = height * this.scale
        this.animations = animations
        this.delayTimer = 0
        this.stopMovmentsDelay = stopMovmentsDelay
        this.hitDamage = hitDamage
        this.direction = direction
        this.movments = movments
        this.attackDamageValue = attackDamageValue
        this.hearts = hearts
        this.lastStateBeforeGetDamage
        this.hitBox = hitBox
        this.topHitBox = topHitBox







        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
            this.animations[key].image = image
            // console.log(this.animations[key])
        }
        // console.log(this.animations)

    }



    // for mashroom only
    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity
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
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = block.position.y + block.height - offset + 0.01
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
                )                // if (monsterLastDirection === 'right') {
                //     monster.switchAnimation('HitRight')
                // }
                // else {
                //     monster.switchAnimation('HitLeft')
                // }

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

}