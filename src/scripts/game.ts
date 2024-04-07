import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import HUDScene from './scenes/HUDScene'

const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 450

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#b2ffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, HUDScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
