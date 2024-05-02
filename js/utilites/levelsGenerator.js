let levels = [
    {
        player: function () {
            return LEVELDATA[LEVELNUMBER]['player']
        },
        background: function () {
            return new Sprite({ position: { x: 0, y: 0 }, imageSrc: `/imgs/backgrounds/map${LEVELNUMBER}.png` })
        },
        // player: generatePlayer(levelId), // returs player object

        borderBlocks: function () {
            return generateBlocksObjectsArray(LEVELNUMBER, 'borderBlocks') // returns borderObjects Array
        },

        platformBlocks: function () {
            return generateBlocksObjectsArray(LEVELNUMBER, 'platformBlocks') // returns platfromObjects Array
        },


        fruits: function () {
            return generateFruits(LEVELNUMBER)
        }, // return fruitsarray objects,


        monsters: function () {
            // console.log(this)
            return LEVELDATA[LEVELNUMBER]['monstersArray']() // returns monsterArrays objects
        },
        gate: function () {
            return LEVELDATA[LEVELNUMBER]['gate'] // return gate object
        },
        levelState: function () {
            return LEVELDATA[LEVELNUMBER]['levelState']
        }
        // log : function(){console.log(this.levelId)}

    },
]


function init() {
    let level = levels[0]
    return level
}
// console.log(init(0).fruits())
// console.log(init(1).fruits())



//init ==> reset player , update borderblocks , platfrom , frutis , monsters , gate , levelstate 