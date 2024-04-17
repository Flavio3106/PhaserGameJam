import InputController from '../controllers/InputController'
import Player from '../objects/Player'
import Interactable from '../objects/interactableObjects/Interactable'
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'
import Door from '../objects/interactableObjects/LockedDoor'
import LoreInteractable from '../objects/interactableObjects/LoreInteractable'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _bg: Phaser.GameObjects.TileSprite
  _key1: KeyInteractable
  _key2: KeyInteractable
  _lore: LoreInteractable
  _door: Door
  _inputController: InputController
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._inputController = new InputController(this)
    this.add.tileSprite(0, 0, 1024, 1024, 'bg-mountains').setOrigin(0, 0)
    this._mainCamera = this.cameras.main
    const cameraWidth = this._mainCamera.width
    const cameraHeight = this._mainCamera.height

    this._player = new Player(this, cameraWidth / 2, cameraHeight / 2)
    this._key1 = new KeyInteractable(this, 200, 100, this._player)
    this._key2 = new KeyInteractable(this, 500, 100, this._player)
    this._lore = new LoreInteractable(this, 50, 50, this._player)
    this._door = new Door(this, 200, 200, this._player, this._key1)
  }

  update(time: number, delta: number) {
    this._inputController.getAllInput()

    this._player.update(time, delta)
    this._door.update(time, delta)
    this._key1.update(time, delta)
    this._key2.update(time, delta)
    this._lore.update(time, delta)
  }
}
