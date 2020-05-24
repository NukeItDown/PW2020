export default class SpriteSheet {
    constructor(image, width, height, res = new Image) {
        this.image = image
        this.dopres = res
        this.width = width
        this.height = height
        this.titles = new Map()
    }

    define(name, x, y, res = 0) {
        const buffers = [false, true].map(flip => {

            const jar = document.createElement('canvas')
            jar.width = this.width
            jar.height = this.height
            const context = jar.getContext('2d')

            if (flip) {
                context.scale(-1, 1)
                context.translate(-this.width, 0)
            }

            context.drawImage(
                res ? this.dopres : this.image,
                x * this.width,
                y * this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height)
            return jar
        })
        this.titles.set(name, buffers)
    }

    draw(name, context, x, y, flip = false) {
        const jar = this.titles.get(name)[flip ? 1 : 0]
        context.drawImage(jar, x, y)
    }
    
    rectdraw(context,color,x, y){
        context.rect(x*16,y*16,16,16)
        context.fillStyle = color
        context.fill()
    }
}