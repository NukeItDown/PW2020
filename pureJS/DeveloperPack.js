import Matrix from './Matrix.js'
import { context, c } from './context.js'

export default function createCollisionLayer(level) {
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

export function move(char){
    ['mousedown', 'mousemove'].forEach(eventName => {
        c.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                char.vel.set(0, 0)
                char.pos.set(event.offsetX, event.offsetY)
            }
        })
    })
}