import { Trait } from '../Entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump')

        this.isJump = 0
        this.duration = 0.3
        this.velocity = 200
        this.engageTime = 0
        this.requestTime = 0
        this.period = 0.5
        this.speedBost = 0.3
        this.lastVelY = 0
        this.criticalHeight = 460
        this.deeps
    }
    start() {
        this.requestTime = this.period
    }
    cancel() {
        this.requestTime = 0
        this.engageTime = 0
    }

    checkif(entity, side) {
        if (side === 'bottom') {
            this.isJump = true
            if (this.lastVelY >= this.criticalHeight) {
                entity.HPbar.getHurt(entity, entity, 1, this.lastVelY)
            }
        } else if (side === 'top') {
            this.cancel()
        }
    }

    knock(entity){
        if(entity.pos.y < 0){
            this.cancel()
            entity.pos.y = 0
            entity.vel.y = 0
            return
        }    
        if(entity.pos.y > this.deeps){
            entity.HPbar.kill(entity)
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.isJump > 0) {
                this.engageTime = this.duration
                this.requestTime = 0
            }
            this.requestTime -= deltaTime
        }

        if (this.engageTime > 0) {
            entity.soundEff.playSound("jump")
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBost)
            this.engageTime -= deltaTime
        }
        this.isJump--
        this.knock(entity)
    }
}
