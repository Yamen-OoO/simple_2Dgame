class LevelState {
    constructor({ position, monsterImageSrc, heartImageSrc, fruitImageSrc , heartsNumber , monstersNumber ,frutisNumber }) {
        this.position = position
        this.width = 100
        this.height = 40
        this.heartsNumber = heartsNumber
        this.monstersNumber = monstersNumber
        this.frutisNumber = frutisNumber
        this.opendGate = false
        this.fadeScreen = false
        this.screenOpacity = 0

        const monsterImage = new Image()
        monsterImage.width = 32 * 0.6
        monsterImage.height = 32 * 0.6
        monsterImage.src = monsterImageSrc

        monsterImage.onload = () => {
            this.monsterImage = monsterImage
        }

        const heartImage = new Image()
        heartImage.width = 32 * 0.7
        heartImage.height = 32 * 0.7
        heartImage.src = heartImageSrc

        heartImage.onload = () => {
            this.heartImage = heartImage
        }


        const fruitImage = new Image()
        fruitImage.width = 32 * 0.8
        fruitImage.height = 32 * 0.8
        fruitImage.src = fruitImageSrc

        fruitImage.onload = () => {
            this.fruitImage = fruitImage
        }

    }
    draw() {
        if (!this.monsterImage) return
        if (!this.fruitImage) return
        if (!this.heartImage) return

        c.font = 'bold 10px Arial';
        c.fillStyle = 'rgba(0 , 0 , 0 ,0.6)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'white'
        c.fillText(this.heartsNumber, 80, 34);
        c.fillStyle = 'white'
        c.fillText(this.monstersNumber, 17, 34);
        c.fillStyle = 'white'
        c.fillText(this.frutisNumber, 45, 34);

        c.drawImage(this.monsterImage, 0, 0, 32, 32, 10, 0, this.monsterImage.width, this.monsterImage.height)
        // c.rotate(20)
        c.drawImage(this.fruitImage, 0, 0, 32, 32, 38, 0, this.fruitImage.width, this.fruitImage.height)
        c.drawImage(this.heartImage, 0, 0, 32, 32, 74, 0, this.heartImage.width, this.heartImage.height)


        // this.openGate()

        // draw heart image
        //draw monster image 
        // draw frutis image
    }
    update() {

        this.draw()
    }
    decreaseHeart(number) {
        this.heartsNumber -= number
        if (this.heartsNumber <= 0) {
            console.log('lost')
            // this.lost()
        }
    }
    decreaseMonstersNumber() {
        this.monstersNumber -= 1
    }
    decreaseFrutisNumber() {
        this.frutisNumber -= 1
    }
    openGate() {
        this.opendGate = true
    }
    complete() {
        this.fadeScreen = true
        gsap.to(LEVELSTATE, {
            screenOpacity: 1,
        })
        LEVELNUMBER++
        setTimeout(()=>{
            gsap.to(LEVELSTATE, {
                screenOpacity: 0,
            })
            ENGINE()
        },4000)
    }
    lost(){
        REPAETEROUND = true
        this.fadeScreen = true
        // LEVELNUMBER++
        gsap.to(LEVELSTATE, {
            screenOpacity: 1,
        })
        ENGINE()
        setTimeout(()=>{
            gsap.to(LEVELSTATE, {
                screenOpacity: 0,
            })
            REPAETEROUND = false
            animate()
        },4000)
    }
}




// used to show the fruits number , monster numbers , heart number
// when monster number = 0 or fruits number = 0 .... we open the gate to the new level