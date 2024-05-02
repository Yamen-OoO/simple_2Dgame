class Block{
    constructor({position , width = 8 , height = 8}){
        this.position = position
        this.width = width
        this.height = height
    }
    draw(){
        c.fillStyle = 'rgba(255 , 0 , 0 , 0.6)'
        c.fillRect(this.position.x , this.position.y  , this.width , this.height)
    }
}