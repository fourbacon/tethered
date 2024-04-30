namespace SpriteKind {
    export const camera = SpriteKind.create()
    export const Player2 = SpriteKind.create()
    export const spike_hitbox = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.spike_hitbox)
    if (level == 1) {
        Level_2()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.spike_hitbox, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Try harder next time")
    game.gameOver(false)
})
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy = -125
    }
})
function Distance (mySprite: Sprite, mySprite2: Sprite) {
    return Math.sqrt((mySprite.x - mySprite2.x) ** 2 + (mySprite.y - mySprite2.y) ** 2)
}
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -125
    }
})
function Tether (num: number) {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx > 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x > mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - 3
    } else if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx > 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x < mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x - 3
    }
    while (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx < 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x > mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x + 3
    }
    while (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx < 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x < mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + 3
    }
}
spriteutils.createRenderable(0, function (screen2) {
    if (!(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).overlapsWith(mySprite)) && !(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mySprite))) {
        screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y - 35, centercamera.x, centercamera.y - 35, 15)
        screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y - 35, centercamera.x, centercamera.y - 35, 15)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprite.vy > 0 && otherSprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        sprite.vy = 0
        sprite.ay = 0
    } else if (otherSprite.vy > 0 && sprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        otherSprite.ay = 0
        otherSprite.vy = 0
    } else if (sprite.vx > 0 && !(sprite.y < otherSprite.y) && otherSprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        sprite.setPosition(otherSprite.x - 15, sprite.y)
    } else if (otherSprite.vx > 0 && !(sprite.y > otherSprite.y) && sprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        otherSprite.setPosition(sprite.x - 15, otherSprite.y)
    } else if (sprite.vx < 0 && !(sprite.y < otherSprite.y) && otherSprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        sprite.setPosition(otherSprite.x + 15, sprite.y)
    } else if (otherSprite.vx < 0 && !(sprite.y > otherSprite.y) && sprite.tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        otherSprite.setPosition(sprite.x + 15, otherSprite.y)
    }
})
function Level_2 () {
    tiles.setCurrentTilemap(tilemap`level1`)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        mySprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . . 1 1 1 1 . . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . . 1 1 1 1 1 1 . . . . . 
            . . . . 1 1 1 1 1 1 1 1 . . . . 
            . . . . 1 1 1 1 1 1 1 1 . . . . 
            . . . 1 1 1 1 1 1 1 1 1 1 . . . 
            . . . 1 1 1 1 1 1 1 1 1 1 . . . 
            `, SpriteKind.spike_hitbox)
        tiles.placeOnTile(mySprite, value)
    }
    tiles.placeOnRandomTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), assets.tile`myTile3`)
    tiles.placeOnRandomTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), assets.tile`myTile2`)
    level += 1
}
let level = 0
let mySprite: Sprite = null
let centercamera: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
let playerchoises = [
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 f f 2 2 f f 2 . . . . 
    . . . . 2 f f 2 2 f f 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . . . 2 2 2 . . . . 2 2 2 . . . 
    . . . 4 4 4 . . . . 4 4 4 . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 8 8 8 8 8 8 8 8 . . . . 
    . . . . 8 f f 8 8 f f 8 . . . . 
    . . . . 8 f f 8 8 f f 8 . . . . 
    . . . . 8 8 8 8 8 8 8 8 . . . . 
    . . . . 8 8 8 8 8 8 8 8 . . . . 
    . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . . 8 8 8 . . . . 8 8 8 . . . 
    . . . 9 9 9 . . . . 9 9 9 . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 7 7 7 7 7 7 7 7 . . . . 
    . . . . 7 f f 7 7 f f 7 . . . . 
    . . . . 7 f f 7 7 f f 7 . . . . 
    . . . . 7 7 7 7 7 7 7 7 . . . . 
    . . . . 7 7 7 7 7 7 7 7 . . . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
    . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
    . . . 7 7 7 . . . . 7 7 7 . . . 
    . . . 5 5 5 . . . . 5 5 5 . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . . . 5 f f 5 5 f f 5 . . . . 
    . . . . 5 f f 5 5 f f 5 . . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . . . 5 5 5 . . . . 5 5 5 . . . 
    . . . 1 1 1 . . . . 1 1 1 . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . a a a a a a a a . . . . 
    . . . . a f f a a f f a . . . . 
    . . . . a f f a a f f a . . . . 
    . . . . a a a a a a a a . . . . 
    . . . . a a a a a a a a . . . . 
    . c c c c c c c c c c c c c c . 
    . a a a a a a a a a a a a a a . 
    . a a a a a a a a a a a a a a . 
    . a a a a a a a a a a a a a a . 
    . a a a a a a a a a a a a a a . 
    . a a a a a a a a a a a a a a . 
    . . . a a a . . . . a a a . . . 
    . . . c c c . . . . c c c . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . 
    . . . . 3 f f 3 3 f f 3 . . . . 
    . . . . 3 f f 3 3 f f 3 . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . 
    . . . . 3 3 3 3 3 3 3 3 . . . . 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
    . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
    . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
    . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
    . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
    . . . 3 3 3 . . . . 3 3 3 . . . 
    . . . 1 1 1 . . . . 1 1 1 . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . f 1 1 f f 1 1 f . . . . 
    . . . . f 1 1 f f 1 1 f . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . f f f f f f f f . . . . 
    . c c c c c c c c c c c c c c . 
    . f f f f f f f f f f f f f f . 
    . f f f f f f f f f f f f f f . 
    . f f f f f f f f f f f f f f . 
    . f f f f f f f f f f f f f f . 
    . f f f f f f f f f f f f f f . 
    . . . f f f . . . . f f f . . . 
    . . . c c c . . . . c c c . . . 
    `, SpriteKind.Player)
]
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 255
    export const ARCADE_SCREEN_HEIGHT = 220
}
scene.centerCameraAt(222.5, 300)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), playerchoises[game.askForNumber("P1 CHARACTER 0:RED 1:BLUE 2:GREEN 3:YELLOW 4:PURPLE 5:PINK 6:BLACK", 1)])
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), playerchoises[game.askForNumber("P2 CHARACTER 0:RED 1:BLUE 2:GREEN 3:YELLOW 4:PURPLE 5:PINK 6:BLACK", 1)])
centercamera = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.camera)
for (let value of playerchoises) {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)) != value && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)) != value) {
        sprites.destroy(value)
    }
}
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 0)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 0)
for (let value2 of tiles.getTilesByType(assets.tile`myTile`)) {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        `, SpriteKind.spike_hitbox)
    tiles.placeOnTile(mySprite, value2)
}
level = 1
tiles.placeOnRandomTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), assets.tile`myTile3`)
tiles.placeOnRandomTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), assets.tile`myTile2`)
game.onUpdate(function () {
    centercamera.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
    Tether(Distance(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))
})
forever(function () {
    if (!(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 300
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 300
    }
})
