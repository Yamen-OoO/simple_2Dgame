let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")
canvas.width = 1003.2 // 1003.2 = 528 * 1.9  // 528 / 16 =33 tiles
canvas.height = 608 // 608 = 320 * 1.9  // 320 / 16 = 20 tiles
let gravity = 0.2


scaleCanvas = {
    height: canvas.height / 1.9
}


let lastDirection = 'right'
let keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        double: false
    },
    e: {
        pressed: false
    }
}




let REPAETEROUND = false
let LEVELNUMBER = 0 
let PLAYER
let LEVELID
let BACKGROUND
let BORDERBLOCKS
let PLATFORMBLOCKS
let FRUTIS
let MONSTERS
let GATE
let LEVELSTATE



function ENGINE() {
    try {
        // console.log(LEVELNUMBER)
        lastDirection = 'right'
        let level = init(LEVELNUMBER)
        console.log(level.player())
        console.log(level.monsters())
        PLAYER = level.player()
        BACKGROUND = level.background()
        BORDERBLOCKS = level.borderBlocks()
        PLATFORMBLOCKS = level.platformBlocks()
        FRUTIS = level.fruits()
        MONSTERS = level.monsters()
        GATE = level.gate()
        LEVELSTATE = level.levelState()
    }
    catch (error) {
        console.log(error)
    }

}
ENGINE()
// console.log(LEVELID)
// console.log(BACKGROUND)
// console.log(GATE)
// console.log(FRUTIS)
// console.log(BORDERBLOCKS)
// console.log(PLATFORMBLOCKS)
// console.log(MONSTERS)
// console.log(LEVELSTATE)





function drawBackground() {
    for (let i = 0; i <= 10; i++) {
        let image = new Image()
        image.src = './imgs/Group 3.png'
        c.drawImage()
    }
    let image = new Image()
    image.src = './imgs/Group 3.png'
    c.drawImage(0, 0, image.width, image.height)
}









let godown = 0
let backgroundPieces = []
for (let i = 0; i <= 12; i++) {
    let piece = {}

    piece.image = new Image()
    piece.image.src = './imgs/Group 3.png'
    piece.godown = 64 * i

    backgroundPieces.push(piece)
}
// console.log(backgroundPieces)








function animate() {
    if(REPAETEROUND === false){
        window.requestAnimationFrame(animate)
    }
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(1.9, 1.9)
    backgroundPieces.forEach((piece, i) => {
        // console.log(i)
        if (piece.godown >= scaleCanvas.height) {
            piece.godown = -64
        }
        c.drawImage(piece.image, 0, piece.godown, piece.image.width, piece.image.height)

        piece.godown++
    })
    BACKGROUND.update()
    c.fillStyle = 'red';


    // floorBorderBlocksObjects.forEach(block => block.draw())
    // platformBlocksObjects.forEach(block => block.draw())
    FRUTIS.forEach(fruit => fruit.update())
    MONSTERS.forEach(monster => monster.update())



    // console.log(levelState)


    // ^ wininning case
    if (LEVELSTATE.monstersNumber === 0 && LEVELSTATE.frutisNumber === 0) {
        LEVELSTATE.openGate()
        GATE.update()
    }






    PLAYER.update()
    LEVELSTATE.update()



    if (LEVELSTATE.fadeScreen === true) {
        c.save()
        c.globalAlpha = LEVELSTATE.screenOpacity
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.font = 'bold 100px Arial';
        c.fillStyle = 'white'
        c.fillText(LEVELNUMBER + 1, 230, (canvas.height / 4) + 30 );
        c.restore()
    }










    if (PLAYER.hitDamage === false) {
        PLAYER.velocity.x = 0
    }
    if (keys.d.pressed === true && PLAYER.hitDamage === false) {
        lastDirection = 'right'
        if (keys.w.pressed === false && PLAYER.velocity.y <= 0.4) {
            // 0.4 is the maximum value the y-axis in becasuse of the gravity add to the velocy.y because of the offset in checkforveritcalcollision
            PLAYER.switchAnimation("RunRight")
        }
        PLAYER.velocity.x = 4
    }
    else if (keys.a.pressed === true && PLAYER.hitDamage === false) {
        lastDirection = 'left'
        if (keys.w.pressed === false && PLAYER.velocity.y <= 0.4) {
            PLAYER.switchAnimation("RunLeft")
        }
        PLAYER.velocity.x = -4
    }

    c.restore()





}


animate()





window.addEventListener("keydown", (e) => {
    if (PLAYER.preventInputs === true) return
    if (PLAYER.enableMove === false) {
        e.preventDefault();
        console.log('no clicking')
        return
    }

    switch (e.key) {
        case "d":
            keys.d.pressed = true
            break

        case "w":
            if (keys.w.pressed === false) {
                //first jump
                PLAYER.velocity.y = -3
                keys.w.pressed = true
                if (lastDirection === 'right') {
                    PLAYER.switchAnimation("JumpRight")
                }
                else {
                    PLAYER.switchAnimation("JumpLeft")

                }
            }
            // seconde jump
            else if (keys.w.pressed && keys.w.double === false) {
                PLAYER.velocity.y = -4
                if (lastDirection === 'right') {
                    PLAYER.switchAnimation("DoubleJumpRight")
                }
                else {
                    PLAYER.switchAnimation("DoubleJumpLeft")

                }
                keys.w.double = true
            }
            break

        case "a":
            keys.a.pressed = true
            break


        case "e":
            keys.e.pressed = true
            if (
                collide({
                    object1: PLAYER,
                    object2: GATE.hitBox
                })
            ) {
                PLAYER.preventInputs = true
                console.log("collidee")
                PLAYER.velocity.x = 0
                PLAYER.velocity.y = 0
                LEVELSTATE.complete()

                //update level number
                // reset data of the game
            }

    }
})




window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "d":
            keys.d.pressed = false
            PLAYER.switchAnimation("IdleRight")
            break
        case "a":
            keys.a.pressed = false
            PLAYER.switchAnimation("IdleLeft")
            break
    }
})










// // each level has :
// // diffrent background , 
// // diffrent eneimes and fuites and conis and boxes and traps , end ,start point
// // diffrent platform blocks and floor 
// // refresh heart and conis













