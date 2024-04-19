import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import HUDScene from './scenes/HUDScene'
import { Scale } from 'phaser'

const DEFAULT_WIDTH = 400
const DEFAULT_HEIGHT = 200

window.addEventListener('load', () => {
  const game = new Phaser.Game({
    backgroundColor: '#1E1611',
    type: Phaser.AUTO,
    scale: {
      parent: 'phaser-game',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
      zoom: 1.5,
      mode: Phaser.Scale.ScaleModes.FIT
    },
    scene: [PreloadScene, MainScene, HUDScene],
    antialias: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,

        gravity: { y: 0 }
      }
    }
  })
})
