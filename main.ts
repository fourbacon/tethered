namespace SpriteKind {
    export const camera = SpriteKind.create()
    export const Player2 = SpriteKind.create()
}
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy = -125
    }
})
spriteutils.createRenderable(0, function (screen2) {
    screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y - 135, centercamera.x, centercamera.y - 135, 10)
    screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y - 135, centercamera.x, centercamera.y - 135, 10)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -125
    }
})
function Tether (num: number) {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx > 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x > mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - 5
    } else if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx > 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x < mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x - 5
    } else if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx < 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x < mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + 5
    } else if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx < 0 && num >= 45 && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x > mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 0
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x + 5
    }
}
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
let Distance = 0
let centercamera: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
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
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
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
    `, SpriteKind.Player))
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
scene.cameraFollowSprite(centercamera)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 0)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 0)
tiles.placeOnTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), tiles.getTileLocation(0, 14))
tiles.placeOnTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), tiles.getTileLocation(1, 14))
game.onUpdate(function () {
    centercamera.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
    Distance = Math.sqrt((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) * (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) + (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) * (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y))
    Tether(Distance)
})
forever(function () {
    if (!(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 300
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 300
    }
})
