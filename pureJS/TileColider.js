// !!!Perenagrujen
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

export class TileColider {
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
            if (!['ground', 'dirt', 'stuff'].includes(match.tile.name)) {
                return
            }
            if (match.tile.name === 'stuff') {
                entity.buff.getBuff()
                return
            }
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.hitbox.x > match.x1) {
                    entity.pos.x = match.x1 - entity.hitbox.x
                    entity.vel.x = 0
                    entity.checkif('left')
                }
            } else if (entity.vel.x < 0 ) {
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
            if (!['ground', 'dirt', 'stuff'].includes(match.tile.name)) {
                return
            }
            if (match.tile.name === 'stuff') {
                entity.buff.getBuff()
                return
            }
            if (entity.vel.y > 0) {
                if(entity.type === 'char'){entity.jump.lastVelY = entity.vel.y}
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

export class entityColider {
    constructor(entites) {
        this.entites = entites
    }
    check(subject){
        this.entites.forEach(entity => {
            if(subject.type === entity.type){
                return
            }
            if( subject.bounds.overlaps(entity.bounds,entity)){
                subject.collides(entity)
                entity.collides(subject)
            }
        })
    }

}