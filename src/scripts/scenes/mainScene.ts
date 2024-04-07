import Player from '../objects/Player'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _bg: Phaser.GameObjects.TileSprite

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
  }

  update(time: number, delta: number) {
    this._player.update(time, delta)
  }
}
