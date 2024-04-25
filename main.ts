namespace SpriteKind {
    export const camera = SpriteKind.create()
    export const Player2 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player2, SpriteKind.Player, function (sprite, otherSprite) {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx > 0) {
        sprite.right = otherSprite.left
    }
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vx < 0) {
        sprite.left = otherSprite.right
    }
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy > 0) {
        sprite.bottom = otherSprite.top
    }
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy < 0) {
        sprite.top = otherSprite.bottom
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player2, function (player2, wall) {
    if (player2.vx != 0) {
        xStoppedAt = wall.x - 16 * Math.abs(player2.vx) / player2.vx
        yStoppedAt = null
player2.vx = 0
        player2.x = xStoppedAt
    }
    if (player2.vy != 0) {
        yStoppedAt = wall.y - 16 * Math.abs(player2.vy) / player2.vy
        player2.vy = 0
        player2.y = yStoppedAt
        xStoppedAt = null
    }
    if (player2.x + 16 > wall.x && player2.x < wall.x + 16 || player2.y + 16 > wall.y && player2.y < wall.y + 16) {
        if (xStoppedAt != null) {
            player2.x = xStoppedAt
        } else if (yStoppedAt != null) {
            player2.y = yStoppedAt
        }
    }
})
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy = -125
    }
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).tileKindAt(TileDirection.Bottom, sprites.dungeon.floorLight0)) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -125
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
    `, SpriteKind.Player2))
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
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 300
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 300
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 0)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 0)
let xStoppedAt: number
let yStoppedAt: number
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(true)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
game.onUpdate(function () {
    centercamera.setPosition((mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) / 2, (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y + mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y) / 2)
})
