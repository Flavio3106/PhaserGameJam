import Player from '../objects/Player'
import LoreInteractable from '../objects/interactableObjects/LoreInteractable'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _bg: Phaser.GameObjects.TileSprite
  lore1: LoreInteractable
  lore2: LoreInteractable
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._mainCamera = this.cameras.main
    const cameraWidth = this._mainCamera.width
    const cameraHeight = this._mainCamera.height

    this._player = new Player(this, cameraWidth / 2, cameraHeight / 2)
    this.add.tileSprite(0, 0, 1024, 1024, 'bg-mountains').setOrigin(0, 0)
    this.add.existing(this._player)
    this.data.set('player', this._player)
    this.lore1 = new LoreInteractable(this, 150, 150, this._player, 'Ciao, questo è un pezzo di lore')
    this.lore2 = new LoreInteractable(this, 350, 350, this._player, 'Ciao, questo è un altro pezzo di lore')
    this.add.existing(this.lore1)
    this.add.existing(this.lore2)
  }

  update(time: number, delta: number) {
    this._player.update(time, delta)
    this.lore1.update(time, delta)
    this.lore2.update(time, delta)
  }
}
