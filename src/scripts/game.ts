import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import HUDScene from './scenes/HUDScene'

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 400

window.addEventListener('load', () => {
  const game = new Phaser.Game({
    backgroundColor: '#1E1611',
    type: Phaser.AUTO,
    scale: {
      parent: 'phaser-game',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
      zoom: 4.5
    },
    scene: [PreloadScene, MainScene, HUDScene],

    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    }
  })
})
