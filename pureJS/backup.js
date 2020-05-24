const c = document.getElementById("front")
const context = c.getContext('2d')
c.height = 10 * 16
c.width = 20 * 16
const PRESSED = 1
const RELEASED = 0
const SPACE = 32
var debug = 1

class Level {
    constructor() {
        this.comp = new Compositor()
        this.entities = new Set()
        this.tiles = new Matrix()
        this.tileColider = new TileColider(this.tiles)
        this.entityColider = new entityColider(this.entities)
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime)
            entity.pos.y += entity.vel.y * deltaTime
            this.tileColider.checkY(entity)
            entity.pos.x += entity.vel.x * deltaTime
            this.tileColider.checkX(entity)

            this.entityColider.check(entity)
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
        console.log(event,{ keyCode })

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
class SpriteSheet {
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
}

class Ven {
    constructor(x, y) {
        this.set(x, y)
    }
    set(x, y) {
        this.x = x
        this.y = y
    }
    move(x, y){
        this.x += x
        this.y += y
    }
}
class Timer {
    constructor(deltaTime = 1 / 60) {
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
class BoundingBox{
    constructor(pos, size, offset){
        this.pos = pos
        this.size = size
        this.offset = offset
    }
    overlaps(box){
        return this.bottom >= box.top 
            && this.top <= box.bottom
            && this.left  <= box.right 
            && this.right >= box.left +1
    }
    get bottom(){
        return this.pos.y + this.size.y + this.offset.y
    }
    set bottom(y){
        this.pos.y = y - (this.size.y + this.offset.y)
    }
    get top(){
        return this.pos.y + this.offset.y
    }
    set top(y){
        this.pos.y = y - this.offset.y
    }
    get left(){
        return this.pos.x + this.offset.x
    }
    set left(x){
        this.pos.x = x - this.offset.x
    }
    get right(){
        return this.pos.x + this.size.x + this.offset.x
    }
    set right(x){
        this.pos.x = x - (this.size.x + this.offset.x)
    }
}
class Trait {
    constructor(name) {
        this.NAME = name
    }
    collides(){
    }
    checkif() { }
    update() {}
}
class Velocity extends Trait {
    constructor() {
        super('velocity')
    }
    update(entity, deltaTime) {
        entity.pos.y += entity.vel.y * deltaTime
        entity.pos.x += entity.vel.x * deltaTime
    }
}
class Jump extends Trait {
    constructor() {
        super('jump')

        this.isJump = 0
        this.duration = 0.3
        this.velocity = 200
        this.engageTime = 0
        this.requestTime = 0
        this.period = 0.5
        this.speedBost = 0.3
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
        } else if (side === 'top') {
            this.cancel()
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
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBost)
            this.engageTime -= deltaTime
        }
        this.isJump--
    }
}
class Go extends Trait {
    constructor() {
        super('go')
        this.dir = 0
        this.lastdir = 1
        this.speed = 2000

        this.distance = 0
    }

    update(entity, deltaTime) {

        if (entity.pos.x < 0 && entity.go.dir == this.lastdir || entity.pos.x + 16 > 20 * 16 && entity.go.dir == this.lastdir) {
            this.distance += Math.abs(entity.vel.y) * deltaTime
            entity.vel.x = 0
        } else {
            entity.vel.x = this.speed * this.dir * deltaTime
            if (this.dir) {
                this.lastdir = this.dir
                this.distance += Math.abs(entity.vel.y) * deltaTime
            } else {
                this.distance = 0
            }
        }
    }
}
class Walk extends Trait {
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
class Buff extends Trait {
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
class Life {
    constructor(hp, type) {
        this.HP = hp
        this.iframe = 0
        if (type !== 'char') {
            this.draw = function draw() { }
        }
    }
    getHurt(dmg, byWho) {
        if (this.iframe <= 0) {
            this.HP -= dmg
            this.iframe = 1
            this.update(byWho)
        }
    }
    invincibleTime() {
        if (this.iframe > 0) {
            this.iframe -= this.time
        } else {
            this.iframe = 0
        }
    }
    getTime(deltaTime) {
        this.time = deltaTime
        this.draw()
        this.invincibleTime()
    }
    draw() {
        context.beginPath()
        context.rect(10, 10, this.HP / 1.2, 5)
        context.fillStyle = 'red'
        context.fill()
    }
    update(byWho) {
        if (this.HP <= 0) {
            console.log("YOU DIED")
            this.HP = 0
        }
    }
}
class Contact extends Trait {
    constructor(){
        super('contact')
    }

    collides(us, them){
        us.HPbar.getHurt(1)
    }
}
class Entity {
    constructor(hp, type) {
        this.pos = new Ven(0, 0)
        this.vel = new Ven(0, 0)
        this.HPbar = new Life(hp, type)
        this.side = new Ven(0, 0)
        this.hitbox = new Ven(0, 0)
        this.offset = new Ven(0,0)
        this.bounds = new BoundingBox(this.pos, this.hitbox, this.offset)
        this.type = type
        this.traits = []
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
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}

class Matrix {
    constructor() {
        this.grid = []
    }
    forEach(callback) {
        this.grid.forEach((colum, x) => {
            colum.forEach((value, y) => {
                callback(value, x, y)
            })
        })
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = []
        }
        this.grid[x][y] = value
    }

    clear() {
        this.grid.length = 0
    }

    get(x, y) {
        const col = this.grid[x]
        if (col) {
            return col[y]
        }

        return undefined

    }
}

class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix
        this.tileSize = tileSize
    }
    toIndex(pos) {
        return Math.floor(pos / this.tileSize)
    }
    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize
        const range = []
        let pos = pos1
        do {
            range.push(this.toIndex(pos))
            pos += this.tileSize
        } while (pos < pMax)
        return range
    }
    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY)
        if (tile) {
            const x1 = indexX * this.tileSize
            const x2 = x1 + this.tileSize
            const y1 = indexY * this.tileSize
            const y2 = y1 + this.tileSize
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            }
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = []
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY)
                if (match) {
                    matches.push(match)
                }
            })
        })
        return matches
    }
}

class TileColider {
    constructor(tilesMatrix) {
        this.tiles = new TileResolver(tilesMatrix)
    }

    test(entity) {
        this.checkY(entity)
        this.checkX(entity)
    }
    checkX(entity) {
        let x
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.hitbox.x
        } else if (entity.vel.x < 0) {
            x = entity.pos.x
        } else {
            return
        }
        const matches = this.tiles.searchByRange(
            x, x,
            entity.pos.y, entity.pos.y + entity.hitbox.y)

        matches.forEach(match => {
            if (match.tile.name === 'stuff') {
                entity.buff.getBuff()
            }
            if (!['ground', 'dirt'].includes(match.tile.name)) {
                return
            }
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.hitbox.x > match.x1) {
                    entity.pos.x = match.x1 - entity.hitbox.x
                    entity.vel.x = 0
                    entity.checkif('left')
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2
                    entity.vel.x = 0
                    entity.checkif('right')
                }
            }
        })
    }
    checkY(entity) {
        let y
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.hitbox.y
        } else if (entity.vel.y < 0) {
            y = entity.pos.y
        } else {
            return
        }
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.hitbox.x,
            y, y)

        matches.forEach(match => {
            if (match.tile.name === 'stuff') {
                entity.buff.getBuff()
            }
            if (!['ground', 'dirt'].includes(match.tile.name)) {
                return
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.hitbox.y > match.y1) {
                    entity.pos.y = match.y1 - entity.hitbox.y
                    entity.vel.y = 0

                    entity.checkif('bottom')
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2
                    entity.vel.y = 0
                    entity.checkif('top')
                }
            }
        })
    }
}

class entityColider {
    constructor(entites) {
        this.entites = entites
    }
    check(subject){
        this.entites.forEach(entity => {
            if(subject === entity){
                return
            }
            if( subject.bounds.overlaps(entity.bounds,entity)){
                subject.collides(entity)
                entity.collides(subject)
            }
        })
    }

}

const struc = [
    [...'_________ggg___gg___'],
    [...'_____Tt__GGGggGGGG__'],
    [...'_____RrGBBBBGGBBBB__'],
    [...'_____GGBB_______BBB_'],
    [...'_____DDB__________BB'],
    [...'___________gg__Tt_BB'],
    [...'gG___g_gggSGGggRrgGB'],
    [...'GDBBBG_GGGGDDGGGGGGG'],
    [...'DDBBBBBDDDDDDDDDDDDD'],
    [...'DDGGGGDDDDDDDDDDDDDD']
]
const asociative = { 'G': 'ground', 'D': 'dirt', 'g': 'grass', 'B': 'brick', 'S': 'stuff', 'T': 'tree', 't': 'tree_1', 'R': 'tree_2', 'r': 'tree_3' }

function drawLevel(level, surse) {
    const gg = document.createElement('canvas')
    gg.width = 20 * 16
    gg.height = 10 * 16
    level.tiles.forEach((tile, x, y) => {
        surse.draw(tile.name, gg.getContext('2d'), x * 16, y * 16)
    })

    return function drawBG(context) {
        context.drawImage(gg, 0, 0)
    }
}
function levelMatrix(level) {
    struc.forEach((elem, y) => {
        elem.forEach((value, x) => {
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
function loadLVL() {
    return loadImage("./textures/pack.png")
        .then(entity => {
            const static = new SpriteSheet(entity, 16, 16)
            const blocks = ['ground', 'dirt', 'grass', 'stuff', 'brick', 'tree'].forEach((elem, i) => {
                if (elem === "tree") {
                    static.define(elem, i, 0)
                    static.define(elem + '_1', i + 1, 0)
                    static.define(elem + '_2', i, 1)
                    static.define(elem + '_3', i + 1, 1)
                } else {
                    static.define(elem, i++, 0)
                }
            })
            return static
        })
}
function constructLevel() {
    return loadLVL()
        .then(static => {
            const level = new Level()

            levelMatrix(level)

            const BG = drawLevel(level, static)
            level.comp.layers.push(BG)

            const spritLayer = createSpriteLayer(level.entities)
            level.comp.layers.push(spritLayer)
            return level
        })
}
function createCollisionLayer(level) {
    const tileResolver = level.tileColider.tiles
    const tileSize = tileResolver.tileSize

    const resolvedTiles = new Matrix

    const getByIndexOriginal = tileResolver.getByIndex
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.set(x, y)
        return getByIndexOriginal.call(tileResolver, x, y)
    }

    return function drawCollision(context) {
        context.strokeStyle = 'blue'
        resolvedTiles.forEach((value, x, y) => {
            context.beginPath()
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
            context.stroke()
        })

        context.strokeStyle = 'red'
        level.entities.forEach(entity => {
            context.beginPath()
            context.rect(entity.pos.x, entity.pos.y, entity.hitbox.x, entity.hitbox.y)
            context.stroke()
        })

        resolvedTiles.clear()
    }
}

function CreateAnim(sprites, delay) {
    return function resolveFrame(distance) {
        const frmaeIndex = Math.floor(distance / delay) % sprites.length
        const frameName = sprites[frmaeIndex]
        return frameName
    }
}

Promise.all([
    loadImage("./textures/hero/walkFrams.png"),
    loadImage("./textures/enemy.png"),
    loadImage("./textures/hero/jump.png"),
    loadImage("./textures/bk.png"),
    constructLevel()
])
    .then(([F_anim, enemy_img, up, bg_img, level]) => {

        const timeout = new Timer(1 / 30)

        const sprint = new SpriteSheet(F_anim, 32, 32, up)
        const enem = new SpriteSheet(enemy_img, 32, 32, enemy_img)

        enem.define('enemy', 0, 0, 1)
        sprint.define('jump', 0, 0, 1)
        const positions = ['wl2', 'wl1', 'sl']
        positions.forEach((elem, i = 0) => {
            sprint.define(elem, i++, 0)
        })

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
        
        const grav = 20
        const char = new Entity(100, 'char')
        const enemy = new Entity(10, 'enemy')
        char.addTrait(new Jump())
        console.log(char)
        /*char.addTrait(new Go())
        char.addTrait(new Buff())
        char.addTrait(new Contact())
        
        enemy.addTrait(new Walk())
        //char.addTrait(new Velocity())

        char.pos.set(60, 20)
        char.hitbox.set(15, 30)
        //char.vel.set(100, -300)
        enemy.pos.set(60, 20)
        enemy.hitbox.set(15, 30)

        const input = new KeyBoardState()
        input.addMapping(38, keyState => {
            if (keyState) {
                char.jump.start()
            } else {
                char.jump.cancel()
            }
        })
        input.addMapping(39, keyState => {
            char.go.dir += keyState ? 1 : -1
        })
        input.addMapping(37, keyState => {
            char.go.dir += keyState ? -1 : 1
        })
        
        input.addMapping(84, keyState => {            
            changeT()
            console.log(debug)
        })
        input.listenTo(window)
        const v = ['mousedown', 'mousemove'].forEach(eventName => {
            c.addEventListener(eventName, event => {
                if (event.buttons === 1) {
                    enemy.vel.set(0, 0)
                    enemy.pos.set(event.offsetX, event.offsetY)
                }
            })
        })
        char.offset.x = -8
        enemy.offset.x = -8
        char.draw = function drawChar(context) {
            sprint.draw(frameRoute(this), context, this.bounds.left, this.bounds.top, char.go.lastdir > 0)
        }
        enemy.draw = function drawEnem(context) {
            enem.draw('enemy', context, this.bounds.left, this.bounds.top, enemy.walk.speed > 0)
        }
        
        level.entities.add(enemy)
        level.entities.add(char)
        level.comp.layers.push(createCollisionLayer(level))
        timeout.update = function update(deltaTime) {
            context.drawImage(bg_img, 0, 0, c.width, c.height)
            level.comp.draw(context)
            char.vel.y += grav
            enemy.vel.y += grav
            level.update(deltaTime)
            char.HPbar.getTime(deltaTime)
            enemy.HPbar.getTime(deltaTime)
        }
        timeout.start()*/
    })