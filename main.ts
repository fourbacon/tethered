namespace SpriteKind {
    export const camera = SpriteKind.create()
    export const Player2 = SpriteKind.create()
}
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy = -125
    }
})
function pickcharacterP1 (list: Sprite[]) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), list[game.askForNumber("P1 Character 0:Red 1:Blue 2:Green 3:Yellow 4:Purple", 1)])
}
function Distance (mySprite: Sprite, mySprite2: Sprite) {
    return Math.sqrt((mySprite.x - mySprite2.x) ** 2 + (mySprite.y - mySprite2.y) ** 2)
}
spriteutils.createRenderable(0, function (screen2) {
    screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y - 135, centercamera.x, centercamera.y - 135, 15)
    screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y - 135, centercamera.x, centercamera.y - 135, 15)
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
function PickcharacterP2 (list: Sprite[]) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), list[game.askForNumber("P2 Character 0:Red 1:Blue 2:Green 3:Yellow 4:Purple", 1)])
}
let centercamera: Sprite = null
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
    `, SpriteKind.Player)
]
pickcharacterP1(playerchoises)
PickcharacterP2(playerchoises)
tiles.setCurrentTilemap(tilemap`level2`)
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
    Tether(Distance(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))
})
forever(function () {
    if (!(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 300
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 300
    }
})
