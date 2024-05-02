function generateBlocksObjectsArray(levelId, blockType) {
    // console.log(levelId)
    // console.log(blockType)
    let symbolId = LEVELDATA[levelId].blocksSymbol
    let dataArray = JSON.parse(LEVELDATA[levelId][blockType])

    let Blocks2dArray = []
    for (let i = 0; i < dataArray.length; i += 66) {
        Blocks2dArray.push(dataArray.slice(i, i + 66))
    }

    let BlocksObjectsArray = []
    Blocks2dArray.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === symbolId) {
                BlocksObjectsArray.push(
                    new Block(
                        {
                            position: {
                                x: x * 8,
                                y: y * 8
                            }
                        }
                    )
                )
            }
        })
    })
    return BlocksObjectsArray
}



function generateFruits(levelId) {
    console.log(levelId)

    let symbolId1 = LEVELDATA[levelId]['fruitId1']
    let symbolId2 = LEVELDATA[levelId]['fruitId2']
    let symbolId3 = LEVELDATA[levelId]['fruitId3']

    let fruit1 = LEVELDATA[levelId]['fruitName1']
    let fruit2 = LEVELDATA[levelId]['fruitName2']
    let fruit3 = LEVELDATA[levelId]['fruitName3']
    let dataArray = JSON.parse(LEVELDATA[levelId]['fruits'])







    let fruits2dArray = []
    for (let i = 0; i < dataArray.length; i += 66) {
        fruits2dArray.push(dataArray.slice(i, i + 66))
    }
    let fruitsObjects = []
    let fruitsIndex = 0
    fruits2dArray.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === symbolId1 || symbol === symbolId2 || symbol === symbolId3) {
                let imagesrc
                // let framerate
                if (symbol === symbolId1) {
                    imagesrc = `./imgs/${fruit1}.png`
                    // framerate = 17
                }
                else if (symbol === symbolId2) {
                    imagesrc = `./imgs/${fruit2}.png`
                    // framerate = 17
                } else if (symbol === symbolId3) {
                    imagesrc = `./imgs/${fruit3}.png`
                    // framerate = 17
                }



                fruitsObjects.push(
                    new Fruit(
                        {
                            position: {
                                x: x * 8,
                                y: y * 8
                            },
                            imageSrc: imagesrc,
                            frameRate: 17,
                            frameBuffer: 4,
                            animations: {
                                Normal: {
                                    imageSrc: imagesrc,
                                    frameRate: 17,
                                },
                                Collected: {
                                    imageSrc: './imgs/Collected.png',
                                    frameRate: 6
                                }

                            },
                            fruitsIndex: fruitsIndex

                        }
                    )
                )
                fruitsIndex++
            }

        })
    })
    return fruitsObjects
}