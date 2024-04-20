import InputController from '../controllers/InputController'
import Skeleton from '../objects/characters/enemy/Skeleton'
import Player from '../objects/characters/player/Player'
import Chest from '../objects/interactableObjects/Chest'
import Interactible from '../objects/interactableObjects/Interactable'
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'
import Door from '../objects/interactableObjects/LockedDoor'
import LoreInteractable from '../objects/interactableObjects/LoreInteractable'

export default class MainScene extends Phaser.Scene {
  _player: Player
  _skeleton1: Skeleton
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  map: Phaser.Tilemaps.Tilemap
  _chestGroup: Phaser.GameObjects.Group
  _skeletonGroup: Phaser.GameObjects.Group
  _key: KeyInteractable
  _sheet: LoreInteractable
  player_initial_position: string = 'player_initial_position'

  _inputController: InputController
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._inputController = new InputController(this)
    this._mainCamera = this.cameras.main
    this.map = this.make.tilemap({ key: 'catacombs', tileWidth: 16, tileHeight: 16 })

    //-600, 1230
    this._player = new Player(this, 40, 990)
    this._skeleton1 = new Skeleton(this, 65, 820, this._player)
    this._skeleton1.addPoints([
      { x: 65, y: 820 },
      { x: 135, y: 860 },
      { x: 245, y: 855 },
      { x: 135, y: 860 },
      { x: 65, y: 820 }
    ])
    this._skeletonGroup = this.add.group()
    this._skeletonGroup.add(this._skeleton1)

    this._chestGroup = this.add.group()
    this._key = new KeyInteractable(this, 235, 880, this._player)
    this._key.setAlpha(0)
    this._sheet = new LoreInteractable(this, 30, 770, this._player)
    this._sheet.setAlpha(0)

    this.setTilemap()
    this._mainCamera.startFollow(this._player, true, 0.5, 0.5)
  }

  setTilemap(): void {
    const Tiled1 = this.map.addTilesetImage('Tiled1')
    const Tiled2 = this.map.addTilesetImage('Tiled2')
    const Tiled3 = this.map.addTilesetImage('Tiled3')
    const Tiled4 = this.map.addTilesetImage('Tiled4')
    const Tiled5 = this.map.addTilesetImage('Tiled5')
    const Tiled6 = this.map.addTilesetImage('Tiled6')
    const Tiled7 = this.map.addTilesetImage('Tiled7')

    const backgroundLayer = this.map.createLayer('Sfondo', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    backgroundLayer.setPosition(
      backgroundLayer.x - backgroundLayer.width / 2,
      backgroundLayer.y - backgroundLayer.y / 2
    )
    const groundLayer = this.map.createLayer('Pavimento', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    groundLayer.setPosition(groundLayer.x - groundLayer.width / 2, groundLayer.y + groundLayer.height / 2)
    const scene1Layer = this.map.createLayer('Scena', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    scene1Layer.setPosition(scene1Layer.x - scene1Layer.width / 2, scene1Layer.y + scene1Layer.height / 2)
    const wallsLayer = this.map.createLayer('Muri', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    wallsLayer.setPosition(wallsLayer.x - wallsLayer.width / 2, wallsLayer.y + wallsLayer.height / 2)
    const openedDoorsLayer = this.map.createLayer('PorteAperte', [
      Tiled1,
      Tiled2,
      Tiled3,
      Tiled4,
      Tiled5,
      Tiled6,
      Tiled7
    ])
    openedDoorsLayer.setPosition(
      openedDoorsLayer.x - openedDoorsLayer.width / 2,
      openedDoorsLayer.y + openedDoorsLayer.height / 2
    )
    const scene2Layer = this.map.createLayer('Scena2', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    scene2Layer.setPosition(scene2Layer.x - scene2Layer.width / 2, scene2Layer.y + scene2Layer.height / 2)
    const scene3Layer = this.map.createLayer('scena3', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    scene3Layer.setPosition(scene3Layer.x - scene3Layer.width / 2, scene3Layer.y + backgroundLayer.height / 2)

    //

    wallsLayer.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this._player, wallsLayer)
  }
  /*
  setTilemap(): void {
    const VictorianInteriors = this._map.addTilesetImage('VictorianInteriors')
    const floorsandwalls = this._map.addTilesetImage('floorsandwalls')
    const smallitems = this._map.addTilesetImage('smallitems')
    const Dungeon = this._map.addTilesetImage('Dungeon')
    const furniturestate1 = this._map.addTilesetImage('furniturestate1')
    const FurnitureState2 = this._map.addTilesetImage('FurnitureState2')

    const sfondo = this._map.createLayer('sfondo', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    const pavimento = this._map.createLayer('pavimento', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    const muro = this._map.createLayer('muro', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    const luci = this._map.createLayer('luci', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    const oggetti2 = this._map.createLayer('oggetti2', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    const oggetti1 = this._map.createLayer('oggetti1', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])

    const oggetti3 = this._map.createLayer('oggetti3', [
      VictorianInteriors,
      floorsandwalls,
      smallitems,
      Dungeon,
      furniturestate1,
      FurnitureState2
    ])
    muro.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this._player, muro, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, oggetti1, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, oggetti2, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, oggetti3, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, luci, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, pavimento, (_player: any, _tile: any) => {}, undefined, this)
    this.physics.add.collider(this._player, sfondo, (_player: any, _tile: any) => {}, undefined, this)
  }
*/
  update(time: number, delta: number) {
    this._inputController.getAllInput()
    this._player.update(time, delta)
    this._key.update(time, delta)
    this._sheet.update(time, delta)
    this._chestGroup.children.entries.forEach(chest => {
      chest.update()
    })
    this._skeletonGroup.children.entries.forEach(skeleton => {
      skeleton.update(time, delta)
    })
  }
}
