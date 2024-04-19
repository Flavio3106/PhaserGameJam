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
  _skeleton: Skeleton
  _mainCamera: Phaser.Cameras.Scene2D.Camera
  _map: Phaser.Tilemaps.Tilemap
  _chestGroup: Phaser.GameObjects.Group
  _skeletonGroup: Phaser.GameObjects.Group
  player_initial_position: string = 'player_initial_position'

  _inputController: InputController
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._inputController = new InputController(this)
    this._mainCamera = this.cameras.main
    const cameraWidth = this._mainCamera.width
    const cameraHeight = this._mainCamera.height
    this._map = this.make.tilemap({ key: 'house', tileWidth: 16, tileHeight: 16 })
    //this._map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 })
    /*const dungeonTileset = this._map.addTilesetImage('dungeon')

    const background = this._map.createLayer('background', dungeonTileset)
    const walls = this._map.createLayer('walls', dungeonTileset)
    const ground = this._map.createLayer('ground', dungeonTileset)
    const chests = this._map.getObjectLayer('chests')
    const characters = this._map.getObjectLayer('characters')

    characters.objects.forEach(character => {
      if (character.name === this.player_initial_position) {
        this._player = new Player(this, character.x! - character.width! / 2, character.y! - character.height! / 2)
      }
    })*/

    this._player = new Player(this, 125, 830)
    this._skeleton = new Skeleton(this, this._player.x + 50, this._player.y, this._player)
    this._skeleton.addPoints([
      { x: this._player.x + 50, y: this._player.y },
      { x: this._player.x + 100, y: this._player.y },
      { x: this._player.x + 100, y: this._player.y - 200 },
      { x: this._player.x + 100, y: this._player.y },
      { x: this._player.x + 50, y: this._player.y }
    ])
    this._skeletonGroup = this.add.group()
    this._skeletonGroup.add(this._skeleton)

    this._chestGroup = this.add.group()
    /*chests.objects.forEach(chest => {
      const chestObj = new Chest(this, chest.x! - chest.width! / 2, chest.y! - chest.height! / 2, this._player)

      this._chestGroup.add(chestObj)
      this.physics.add.collider(chestObj, this._player, (chest, player) => {})
    })

    walls.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this._player, walls, (player: any, walls: any) => {}, undefined, this)*/

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

    this._mainCamera.startFollow(this._player, true, 0.5, 0.5)
  }

  update(time: number, delta: number) {
    this._inputController.getAllInput()
    this._player.update(time, delta)
    this._chestGroup.children.entries.forEach(chest => {
      chest.update()
    })
    this._skeletonGroup.children.entries.forEach(skeleton => {
      skeleton.update(time, delta)
    })
  }
}
