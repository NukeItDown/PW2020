import {context} from './context.js'

export default class Life {
    constructor(hp, type) {
        this.HP = 100
        this.iframe = 0
        this.painDuration = 1.2
        this.isJustAsratch = 1
        this.boneCrack = 1200
        if (type !== 'char') {
            this.draw = function draw() { }
        }
    }
    getHurt(byWho, taker, pain = 0, falldmg = 1) {
        if (this.iframe <= 0) {
            taker.soundEff.playSound("hit")
            this.iframe = 1
            if(pain && this.isJustAsratch){
                this.pain = this.painDuration
                this.isJustAsratch = 0
                taker.go.speed = taker.go.speed - this.boneCrack
                this.HP -= byWho.dmg + Math.round((falldmg - taker.jump.criticalHeight) / 4)
            }else{
                this.HP -= byWho.dmg
            }
            this.deathCheck(byWho,taker)
        }
    }
    kill(entity){
        this.HP = 0
        this.deathCheck(null,entity)
    }
    invincibleTime(time,entity) {
        if (this.iframe > 0) {
            this.iframe -= time
        } else {
            this.iframe = 0
        }
        if(this.isJustAsratch){
            return
        }
        if(this.pain > 0){
            this.pain -= time
        }else{
            this.isJustAsratch = 1
            entity.go.speed = entity.go.speed + this.boneCrack 
            this.pain = 0
        }
        
    }
    update(time,entity) {
        this.draw()
        this.invincibleTime(time,entity)
    }
    draw() {
        context.beginPath()
        context.rect(10, 10, this.HP / 1.2, 5)
        context.fillStyle = 'red'
        context.fill()
    }
    deathCheck(byWho,taker) {
        if (this.HP <= 0) {
            this.HP = 0
            taker.status = 1
        }
    }
}
