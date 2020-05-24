import Ven from './Ven.js'
import Life from './Life.js'
import BoundingBox from './BoundingBox.js'
import Matrix from './Matrix.js'
import { context, c } from './context.js'

export class Trait {
    constructor(name) {
        this.NAME = name
    }
    collides(){
    }
    checkif() { }
    update() {}
}


export class Audion{
    constructor(){
        this.soundBox = []
    }
    addSound(surse, eventType){
        this.soundBox[eventType] = new Audio(surse)
    }
    playSound(name, repeat=0){
        if(this.soundBox[name].paused || !repeat){
            this.soundBox[name].play()
        }else{
            this.soundBox[name].currentTime=0
            this.soundBox[name].play()
        }
    }
}

export class Pickup{
    constructor(type, subtype = 'NPC', color = "#9932CC"){
        this.status = 0
        this.comp = new Matrix()
        this.pos = new Ven(0, 0)
        this.posX
        this.posY
        this.vel = new Ven(0, 0)
        this.offset = new Ven(-11,0)
        this.hitbox = new Ven(16, 16)
        this.bounds = new BoundingBox(this.pos, this.hitbox, this.offset)
        this.type = type
        this.subtype = 'inter'
        this.color = color
        this.soundEff = new Audion()
    }

    reGenerate(){
        try{
            if(!this.status){
                this.status = 1
                this.posX = Math.floor(Math.random()*this.comp.grid.length)
                this.posY = Math.floor(Math.random()*this.comp.grid[this.posX].length)
                while(this.comp.grid[this.posX][this.posY] !== 'endpoint'){
                    this.posY = Math.floor(Math.random()*this.comp.grid[this.posX].length)
                }  
                this.pos.x=this.posX*16
                this.pos.y=this.posY*16
            }
        }catch{
            this.reGenerate()
        }
    }

    update(){
        context.beginPath()
        context.rect(this.pos.x,this.pos.y,16,16)
        context.fillStyle = this.color //"#9932CC"
        context.fill()
        context.closePath()
        this.reGenerate()
    }

    collides(entity){
        this.soundEff.playSound("point")
        entity.points += 10
        this.status = 0
    }
    draw(){}
    checkif(){}

}

export default class Entity {
    constructor(hp, type, subtype = 'NPC',) {
        this.status = 0
        this.dmg = 10
        this.pos = new Ven(0, 0)
        this.vel = new Ven(0, 0)
        this.HPbar = new Life(hp, type)
        this.side = new Ven(0, 0)
        this.hitbox = new Ven(0, 0)
        this.offset = new Ven(0,0)
        this.bounds = new BoundingBox(this.pos, this.hitbox, this.offset)
        this.type = type
        this.subtype = subtype
        this.traits = []
        this.soundEff = new Audion()
        this.points = 0
    }
    collides(entity){
        this.traits.forEach(trait => {
            trait.collides(this, entity)
        })
    }
    addTrait(trait) {
        this.traits.push(trait)
        this[trait.NAME] = trait
    }
    checkif(side) {
        this.traits.forEach(trait => {
            trait.checkif(this, side)
        })
    }
    spawn(x,y){
        this.pos.set(x*16,y*16-this.hitbox.y)
    }
    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level)
        })
    }
}
