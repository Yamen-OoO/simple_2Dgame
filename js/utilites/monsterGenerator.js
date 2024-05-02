function mushrooma(index , position , velocityX , direction , movments){
    return new Mushroom({
        index: index,
        width: 32,
        height: 32,
        position: position,
        velocity: {
            x: velocityX,
            y: 0
        },
        direction: direction,
        movments:movments,
        imageSrc: '/imgs/monster/mushroom/RunRight.png',
        frameRate: 16,
        frameBuffer: 3,
        scale: .9,
        stopMovmentsDelay: 200,
        attackDamageValue: 1,
        hearts: 2,
        animations: {
            IdleLeft: {
                imageSrc: '/imgs/monster/mushroom/IdleLeft.png',
                frameRate: 14
            },
            RunLeft: {
                imageSrc: '/imgs/monster/mushroom/RunLeft.png',
                frameRate: 16
            },
            HitRight: {
                imageSrc: '/imgs/monster/mushroom/HitRight.png',
                frameRate: 5
            },
            IdleRight: {
                imageSrc: '/imgs/monster/mushroom/IdleRight.png',
                frameRate: 14
            },
            RunRight: {
                imageSrc: '/imgs/monster/mushroom/RunRight.png',
                frameRate: 16
            },

            HitLeft: {
                imageSrc: '/imgs/monster/mushroom/HitLeft.png',
                frameRate: 5
            }
        }
    })
}


function fatbirda( index , position  , movments ,dangerousArea , floorDistance ){
    return new  FatBird({
        index: index,
        position: position,
        velocity: {
            x: 0,
            y: 0
        },
        movments: movments , 
        floorDistance: floorDistance,
        dangerousArea : dangerousArea,
        imageSrc: '/imgs/monster/fatbird/Idle.png',
        frameRate: 8,
        frameBuffer: 3,
        scale: .8,
        stopMovmentsDelay: 30,
        attackDamageValue: 1,
        hearts: 2,
        animations: {
            Idle: {
                imageSrc: ' /imgs/monster/fatbird/Idle.png ',
                frameRate: 8
            },
            Ground: {
                imageSrc: '/imgs/monster/fatbird/Ground.png',
                frameRate: 4
            },
            Fall: {
                imageSrc: '/imgs/monster/fatbird/Fall.png',
                frameRate: 4
            },
            Hit: {
                imageSrc: '/imgs/monster/fatbird/Hit.png',
                frameRate: 5
            },
        }
    });
}


// console.log( mushrooma(0 , {x: 50,y: 210},1,'right',{start: 20,end: 185}))