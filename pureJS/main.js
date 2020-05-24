import { context, c } from './context.js'
import SpriteSheet from './SpriteSheet.js';
import { TileColider, entityColider } from './TileColider.js';
import Entity from './Entity.js';
import {Pickup} from './Entity.js';
import {Audion} from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import Buff from './traits/Buff.js';
import Velocity from './traits/Velocity.js';
import Walk from './traits/Walk.js';
import Contact from './traits/Contact.js';
import createCollisionLayer, {move} from './DeveloperPack.js';
import Matrix from './Matrix.js'

const PRESSED = 1
const RELEASED = 0



class Menu {
    constructor() {
        this.pauseGame = false
        this.start = 1
        this.KeyMap = new Map()
        this.soundEff = new Audion
    }
    pause(level) {
        if (!this.start) {
            this.pauseGame = !this.pauseGame
            this.update(level)
        }
    }
    update(level) {
        if (this.pauseGame) {
            context.rect(0, 0, level.width, level.height)
            context.fillStyle = "rgba(0,0,0, 0.5)"
            context.fill()
            context.textAlign = "left"
            context.font = "25px Strange"
            context.fillStyle = "#FFFFFF"
            context.fillText("Paused", 10, 15)
            context.fillText("press Esc. to continue", 10, 30)
        }
    }
    startPanel(level) {
        context.fillStyle = "#000000"
        context.rect(0, 0, level.width, level.height)
        context.fill()
        context.font = "bold 35px Strange"
        context.textAlign = "center"
        context.fillStyle = "#FFFFFF"
        context.fillText("Forest", level.width / 2, (level.height / 2) - 15)
        context.beginPath()
        context.font = "25px Strange"
        context.fillText("Press Enter to start", level.width / 2, level.height / 2)
    }
    addMapping(keyCode, callback) {
        this.KeyMap.set(keyCode, callback)
    }
    handleMenuEvent() {
        const { keyCode } = event

        if (!this.KeyMap.has(keyCode)) {
            return
        }

        event.preventDefault()
        const KeyState = event.type === 'keydown' ? PRESSED : RELEASED

        this.KeyMap.get(keyCode)(KeyState)
    }

    listenToMenu(window) {
        window.addEventListener('keydown', event => {
            this.handleMenuEvent(event)
        })
    }
}

class Level {
    constructor() {
        this.comp = new Compositor()
        this.entities = new Set()
        this.tiles = new Matrix()
        this.tileColider = new TileColider(this.tiles)
        this.entityColider = new entityColider(this.entities)
        this.grav = 20
        this.height
        this.width
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this)
            if(entity.subtype !== 'inter'){
                entity.pos.y += entity.vel.y * deltaTime
                this.tileColider.checkY(entity)
                entity.pos.x += entity.vel.x * deltaTime
                this.tileColider.checkX(entity)
            }
            this.entityColider.check(entity)
            entity.vel.y += 20
        })

    }
}

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
    })
}
function createSpriteLayer(entites) {
    return function drawSpriteLayer(context) {
        entites.forEach(entity => {
            entity.draw(context)
        })
    }
}

class KeyBoardState {
    constructor() {
        this.KeyStates = new Map();

        this.KeyMap = new Map()
    }
    addMapping(keyCode, callback) {
        this.KeyMap.set(keyCode, callback)
    }
    handleEvent(event) {
        const { keyCode } = event

        if (!this.KeyMap.has(keyCode)) {
            return
        }

        event.preventDefault()

        const KeyState = event.type === 'keydown' ? PRESSED : RELEASED
        if (this.KeyStates.get(keyCode) === KeyState) {
            return
        }
        this.KeyStates.set(keyCode, KeyState)

        this.KeyMap.get(keyCode)(KeyState)
    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event)
            })
        })
    }
}
function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(r => r.json())
        .then(levelSpec => {
            const level = new Level()
        })
}

class Compositor {
    constructor() {
        this.layers = []
    }
    draw(context) {
        this.layers.forEach(Layer => {
            Layer(context)
        })
    }
}

class Timer {
    constructor(deltaTime = 1 / 30) {
        let accumulateTime = 0
        let lastTime = 0

        this.upgradeProxy = (time) => {
            accumulateTime += (time - lastTime) / 1000
            while (accumulateTime > deltaTime) {
                this.update(deltaTime)
                accumulateTime -= deltaTime
            }
            lastTime = time
            this.enquene()
        }
    }
    enquene() {
        requestAnimationFrame(this.upgradeProxy)
    }
    start() {
        this.enquene()
    }
}

const struc = [
    [...'_EE_________________'],
    [...'_EE_________________'],
    [...'_GG____EEEE____EE___'],
    [...'_______________EE___'],
    [...'________EE_____GG___'],
    [...'E______EEEE_________'],
    [...'_______EEEE______EE_'],
    [...'________EE______EEEE'],
    [...'________________GG__'],
    [...'________GGGG________'],
    [...'GG____GGDDDDGG____GG'],
    [...'_____GDDDD__D_____EE'],
    [...'____GDD_________E___'],
    [...'GGG_D______GEE_____E'],
    [...'DD__D______DGGDDG__G'],
    [...'D___DGGG____DDDDDGGD'],
    [...'_____DD___EEEEEEE___'],
    [...'EEEEE____EEEEE___EEE'],
    [...'EE________SGGEEEEEEE'],
    [...'GG___G_GGGGDDGGG__DG'],
    [...'DD______DDDDDDDD__DD'],
    [...'DDGGGGDDDDDDDDDDD_DD']
]

const frontstruc = [
    [...'____________________'],
    [...'____________________'],
    [...'____________________'],
    [...'_______________gg___'],
    [...'____________________'],
    [...'____________________'],
    [...'________________Tt__'],
    [...'________________Rr__'],
    [...'Tt______gg__________'],
    [...'Rr____Tt____Tt____Tt'],
    [...'____________________'],
    [...'____________________'],
    [...'Tt__________________'],
    [...'____________t_______'],
    [...'_________________gg'],
    [...'____________________'],
    [...'_______B____________'],
    [...'______BB____g_Tt____'],
    [...'gg___gBB_____gRr__g_'],
    [...'_BBBBBB_B___________'],
    [...'_BBBBBBBB___________'],
    [...'____________________']
]

const asociative = { 'G': 'ground', 'D': 'dirt', 'g': 'grass', 'B': 'brick', 'S': 'stuff', 'T': 'tree', 't': 'tree_1', 'R': 'tree_2', 'r': 'tree_3', 'E': 'endpoint' }

function drawLevel(level, surse) {
    const gg = document.createElement('canvas')
    gg.width = level.width * 16
    gg.height = level.height * 16
    level.tiles.forEach((tile, x, y) => {
        surse.draw(tile.name, gg.getContext('2d'), x * 16, y * 16)
    })

    return function drawBG(context) {
        context.drawImage(gg, 0, 0)
    }
}
//////// surse.rectdraw(gg.getContext('2d'), "#9932CC", x, y)



function levelFrontBG(level, surse) {
    const bg = document.createElement('canvas')
    bg.width = level.width * 16
    bg.height = level.height * 16
    frontstruc.forEach((elem, y) => {
        elem.forEach((value, x) => {
            if (value != '_') {
                surse.draw(asociative[value], bg.getContext('2d'), x * 16, y * 16)  
            }
            x++
        })
        y++
    })

    return function drawFrontBG(context) {
        context.drawImage(bg, 0, 0)
    }
}

function levelMatrix(level, pick) {
    struc.forEach((elem, y) => {
        elem.forEach((value, x) => {
            if(value === 'E'){
                pick.comp.set(x, y,asociative[value])
                return
            }
            if (value != '_') {
                level.tiles.set(x, y, {
                    name: asociative[value]
                })
            }
            x++
        })
        y++
    })
}


function loadLvlResurses() {
    return loadImage("./textures/pack.png")
        .then(entity => {
            const block = new SpriteSheet(entity, 16, 16)
            const blocks = ['ground', 'dirt', 'grass', 'stuff', 'brick', 'tree'].forEach((elem, i) => {
                if (elem === "tree") {
                    block.define(elem, i, 0)
                    block.define(elem + '_1', i + 1, 0)
                    block.define(elem + '_2', i, 1)
                    block.define(elem + '_3', i + 1, 1)
                } else {
                    block.define(elem, i++, 0)
                }
            })
            return block
        })
}
function constructLevel() {
    return loadLvlResurses()
        .then(block => {
            const level = new Level()
            
            const pup = new Pickup('PU')
            pup.soundEff.addSound("./audio/jg-032316-sfx-8-bit-score-1.mp3","point")
            level.entities.add(pup)
            
            level.height = c.height = struc.length * 16
            level.width = c.width = struc[0].length * 16

            levelMatrix(level, pup)

            const BG = drawLevel(level, block)
            const frontBG = levelFrontBG(level, block)

            level.comp.layers.push(frontBG)
            level.comp.layers.push(BG)

            const spritLayer = createSpriteLayer(level.entities)
            level.comp.layers.push(spritLayer)
            return level
        })
}


function CreateAnim(sprites, delay) {
    return function resolveFrame(distance) {
        const frmaeIndex = Math.floor(distance / delay) % sprites.length
        const frameName = sprites[frmaeIndex]
        return frameName
    }
}

function createEnemy(x, y, enem) {
    const enemy = new Entity(10, 'enemy')
    enemy.addTrait(new Walk())
    enemy.hitbox.set(10, 20)
    enemy.spawn(x, y)
    enemy.offset.x = -11
    enemy.offset.y = -10

    enemy.draw = function drawEnem(context) {
        enem.draw('enemy', context, this.bounds.left, this.bounds.top, enemy.walk.speed > 0)
    }

    return enemy
}
const charRun = CreateAnim(['wl2', 'wl1'], 6)
function frameRoute(char) {
    if (char.jump.isJump < 0) {
        return 'jump'
    }
    if (char.go.dir != 0) {
        return charRun(char.go.distance)
    }
    return 'sl'
}

function createChar(x, y, sprint) {
    const char = new Entity(100, 'char')
    char.addTrait(new Jump())
    char.jump.deeps = c.height
    char.addTrait(new Go())
    char.addTrait(new Buff())

    char.addTrait(new Contact())

    char.hitbox.set(10, 20)
    char.spawn(x, y)
    char.offset.x = -11
    char.offset.y = -8

    char.go.setSize(c.width, char)

    char.draw = function drawChar(context) {
        sprint.draw(frameRoute(this), context, this.bounds.left, this.bounds.top, char.go.lastdir > 0)
    }
    char.soundEff.addSound('./audio/video-game-vintage-jump-ascend_zkbs6f4_.mp3',"jump")
    char.soundEff.addSound('./audio/jg-032316-sfx-8-bit-bounce-sound.mp3',"buff")
    char.soundEff.addSound('./audio/jg-032316-sfx-8-bit-punch.mp3',"hit")

    return addControls(char)
}

function addControls(char){
    const input = new KeyBoardState()

    input.addMapping(87, keyState => {
        if (keyState) {
            char.jump.start()
        } else {
            char.jump.cancel()
        }
    })
    input.addMapping(68, keyState => {
        char.go.dir += keyState ? 1 : -1
    })
    input.addMapping(65, keyState => {
        char.go.dir += keyState ? -1 : 1
    })
    input.listenTo(window)
    
    return char
}

const levelH = c.height = struc.length * 16
const levelW = c.width = struc[0].length * 16
Promise.all([
    loadImage("./textures/hero/walkFrams.png"),
    loadImage("./textures/enemy.png"),
    loadImage("./textures/hero/jump.png"),
    loadImage("./textures/bk.png"),
    constructLevel()
])
    .then(([F_anim, enemy_img, up, bg_img, level]) => {

        const timeout = new Timer(1 / 30)

        const menu = new Menu()
        menu.soundEff.addSound("./audio/jg-032316-sfx-8-bit-zap-sound-1.mp3", "pause")
        const sprint = new SpriteSheet(F_anim, 32, 32, up)
        const enem = new SpriteSheet(enemy_img, 32, 32, enemy_img)
       
        enem.define('enemy', 0, 0, 1)
        sprint.define('jump', 0, 0, 1)

        const positions = ['wl2', 'wl1', 'sl']

        positions.forEach((elem, i = 0) => {
            sprint.define(elem, i++, 0)
        })

        const char = createChar(6, 15, sprint)
        const enemy = createEnemy(3, 21, enem)
        const enemy2 = createEnemy(12, 14, enem)
        menu.addMapping(27, keyState => {
            menu.soundEff.playSound("pause",1)
            menu.pause(level)
        })
        menu.addMapping(13, keyState => {
            menu.start = 0
        })

        menu.listenToMenu(window)
        level.entities.add(enemy)
        level.entities.add(enemy2)
        level.entities.add(char)
        //level.comp.layers.push(createCollisionLayer(level))
        menu.startPanel(level)
        timeout.update = function update(deltaTime) {
            if (menu.start) {
                return
            }
            if (!menu.pauseGame) {
                context.drawImage(bg_img, 0, 0, c.width, c.height)
                level.comp.draw(context)
                level.update(deltaTime)
            }
        }
        timeout.start()
    })