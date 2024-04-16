import Player from '../objects/Player'
import Interactable from '../objects/interactableObjects/Interactable'
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _bg: Phaser.GameObjects.TileSprite
  key: Interactable

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.add.tileSprite(0, 0, 1024, 1024, 'bg-mountains').setOrigin(0, 0)
    this._mainCamera = this.cameras.main
    const cameraWidth = this._mainCamera.width
    const cameraHeight = this._mainCamera.height

    this._player = new Player(this, cameraWidth / 2, cameraHeight / 2)
    this.add.existing(this._player)
    this.key = new Interactable(this, 350, 250, this._player, 'key-blue')
    this.add.existing(this.key)
  }

  update(time: number, delta: number) {
    this._player.update(time, delta)
    this.key.update(time, delta)
  }
}
