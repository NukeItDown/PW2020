import {Trait} from '../Entity.js'

export default class Contact extends Trait {
    constructor(){
        super('contact')
    }

    collides(us, them){
        if(them.type === 'PU'){
            return
        }
        us.HPbar.getHurt(them,us)
    }
    update(entity,deltatime,level){
        entity.HPbar.update(deltatime, entity)
        if(entity.status){
            level.entities.delete(entity)
        }
    }
}

