import {Trait} from '../Entity.js'
import {context} from '../context.js'

export default class Buff extends Trait {
    constructor() {
        super('buff')
        this.status = 0
        this.duration = 10
        this.requestTime = 0
        this.wait = 0.5
        this.delay = this.wait * 2
    }

    checkif(){
    }
    getBuff(){
        this.requestTime = this.duration
        this.status = 1
    }
    draw(color = 'blue'){
        context.beginPath()
        context.rect(10,20,10,10)
        context.fillStyle = color
        context.fill()
    }   
    update(entity, deltaTime) {
        this.step = deltaTime

        if(this.status){
            entity.jump.velocity = 250
            entity.soundEff.playSound("buff")
            this.requestTime -= deltaTime
        
            this.draw()
            
            if(Math.ceil(this.requestTime) < Math.ceil(this.duration/3)){
                this.step += 0.056
                if(this.wait <= this.delay){
                    this.draw('red')
                    this.delay -= this.step * 0.1
                }
                if(this.delay > 0){
                    this.delay -= this.step
                }else{
                    this.delay = this.wait * 2
                }
            }
        }else{
            return
        }
        if(this.requestTime < 0){
            this.status = 0
            this.requestTime = 0
            entity.jump.velocity = 200
        }
    }
}