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
    screen2.drawLine(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y, 10)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0) && mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -125
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprite.vy > 0 && otherSprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.vy = 0
        sprite.ay = 0
    } else if (otherSprite.vy > 0 && sprite.isHittingTile(CollisionDirection.Bottom)) {
        otherSprite.ay = 0
        otherSprite.vy = 0
    }
})
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
let centercamera = sprites.create(img`
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
game.onUpdate(function () {
    centercamera.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
})
forever(function () {
    if (!(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).overlapsWith(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))))) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 300
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 300
    }
})
