function Finn(position) {
    return new Player({
        position: position,
        velocity: {
            x: 0,
            y: 0
        },
        imageSrc: './imgs/IdleRight.png',
        frameRate: 11,
        animations: {
            IdleRight: {
                imageSrc: './imgs/IdleRight.png',
                frameRate: 11,
                frameBuffer: 3
            },
            IdleLeft: {
                imageSrc: './imgs/IdleLeft.png',
                frameRate: 11,
                frameBuffer: 3

            },
            RunRight: {
                imageSrc: './imgs/RunRight.png',
                frameRate: 12,
                frameBuffer: 3

            },
            RunLeft: {
                imageSrc: './imgs/RunLeft.png',
                frameRate: 12,
                frameBuffer: 3

            },
            JumpRight: {
                imageSrc: './imgs/JumpRight.png',
                frameRate: 1,
                frameBuffer: 3

            },
            JumpLeft: {
                imageSrc: './imgs/JumpLeft.png',
                frameRate: 1,
                frameBuffer: 3

            },
            DoubleJumpRight: {
                imageSrc: './imgs/DoubleJumpRight.png',
                frameRate: 6,
                frameBuffer: 2

            },
            DoubleJumpLeft: {
                imageSrc: './imgs/DoubleJumpLeft.png',
                frameRate: 6,
                frameBuffer: 2

            },
            FallRight: {
                imageSrc: './imgs/FallRight.png',
                frameRate: 1,
                frameBuffer: 3

            },
            FallLeft: {
                imageSrc: './imgs/FallLeft.png',
                frameRate: 1,
                frameBuffer: 3

            },
            HitRight: {
                imageSrc: './imgs/HitRight.png',
                frameRate: 7,
                frameBuffer: 3

            },
            HitLeft: {
                imageSrc: './imgs/HitLeft.png',
                frameRate: 7,
                frameBuffer: 3

            },
        }
    })
}



















function gateBlue(position){
    return new Gate({
        position: position,
        scale: 1,
        width: 60,
        height: 60,
        imageSrc: "./imgs/gates/gatePink.png",
        frameRate: 16
    })
}

function levelStateMenu(hearts , monsters , fruits){
    return new LevelState({
        position: { x: 0, y: 0 },
        monsterImageSrc: '/imgs/monster/mushroom/IdleRight.png',
        fruitImageSrc: './imgs/Cherries.png',
        heartImageSrc: './imgs/IdleRight.png',
        heartsNumber : hearts ,
        monstersNumber : monsters ,
        frutisNumber : fruits,
    })
}