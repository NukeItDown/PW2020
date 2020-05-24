import Entity, {Trait} from '../Entity.js'

export default class Walk extends Trait {
    constructor() {
        super('walk')
        this.speed = -1000

        this.distance = 0
    }

    checkif(entity, side) {
        if (side === 'left' || side === 'right') {
            this.speed = -this.speed
        }
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * deltaTime
    }
}