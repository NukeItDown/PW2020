import {Trait} from '../Entity.js'

export default class Go extends Trait {
    constructor() {
        super('go')
        this.dir = 0
        this.lastdir = 1
        this.speed = 2000

        this.size

        this.distance = 0
    }

    knock(entity){
        if(entity.pos.x < 0){
            entity.pos.x = 0
            return
        }
        if(entity.pos.x > this.size){
            entity.pos.x = this.size
        }
    }

    setSize(size,entity){
        this.size = size - Math.abs(entity.hitbox.y + entity.offset.y)
    }

    update(entity, deltaTime) {
            
        entity.vel.x = this.speed * this.dir * deltaTime
        if (this.dir) {
            this.lastdir = this.dir
            this.distance += Math.abs(entity.vel.y) * deltaTime
        } else {
            this.distance = 0
        }
        this.knock(entity)
    }
}