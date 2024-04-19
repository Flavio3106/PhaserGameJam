import InputController from '../controllers/InputController'
import Player from '../objects/Player'
import Interactible from '../objects/interactableObjects/Interactable'
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'
import Door from '../objects/interactableObjects/LockedDoor'
import LoreInteractable from '../objects/interactableObjects/LoreInteractable'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _map: Phaser.Tilemaps.Tilemap

  _inputController: InputController
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._inputController = new InputController(this)
    this._mainCamera = this.cameras.main
    const cameraWidth = this._mainCamera.width
    const cameraHeight = this._mainCamera.height

    this._player = new Player(this, 50, 400)

    const map = this.make.tilemap({ key: 'house', tileWidth: 16, tileHeight: 16 })

    const principale = map.addTilesetImage('principale')
    const secondario = map.addTilesetImage('secondario')
    const muri = map.addTilesetImage('muri')
    const muri2 = map.addTilesetImage('muri2')
    const FDR_Dungeon = map.addTilesetImage('FDR_Dungeon')
    const TopDownHouse_FurnitureState1 = map.addTilesetImage('TopDownHouse_FurnitureState1')

    const background = map.createLayer('Livello tile 1', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const groundLayer = map.createLayer('pavimento', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const wallsLayer = map.createLayer('muri', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const scene = map.createLayer('scena', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const scene2 = map.createLayer('scena2', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const lights = map.createLayer('luci', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])
    const _scene = map.createLayer('scena', [
      principale,
      secondario,
      muri,
      muri2,
      FDR_Dungeon,
      TopDownHouse_FurnitureState1
    ])

    this.physics.world.setBounds(
      0, //x
      0, //y
      map.widthInPixels, //width
      map.heightInPixels //height
    )

    wallsLayer.setCollisionByProperty({ collides: true })
    groundLayer.setCollisionByProperty({ collides: true })
    scene.setCollisionByProperty({ collides: true })
    scene2.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this._player, wallsLayer, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, groundLayer, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, scene, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, scene2, (_player: any, _tile: any) => {}, undefined, this)

    this._mainCamera.startFollow(this._player, true, 0.5, 0.5)
  }

  update(time: number, delta: number) {
    this._inputController.getAllInput()

    this._player.update(time, delta)
  }
}
