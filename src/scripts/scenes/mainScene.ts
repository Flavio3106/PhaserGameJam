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
  _key1: KeyInteractable
  _key2: KeyInteractable
  _sheet1: LoreInteractable
  _sheet2: LoreInteractable
  sheets: LoreInteractable[] = []
  private enigma1: string =
    'Dove le ossa si perdono nella penombra, cerca il guardiano silenzioso della porta segreta. Con attenzione, segui il suo sguardo per individuare la chiave.'
  private enigma2: string =
    "Nel cuore oscuro delle Catacombe, dove le ombre si fondono con le pareti di pietra, cerca il segno dell'ultimo sacerdote. Là troverai la chiave che apre la via verso la luce"
  player_initial_position: string = 'player_initial_position'

  _inputController: InputController
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this._inputController = new InputController(this)
    this._mainCamera = this.cameras.main
    this.map = this.make.tilemap({ key: 'catacombs', tileWidth: 16, tileHeight: 16 })
    this._player = new Player(this, 100, 680)

    //*Skeletons
    this._skeletonGroup = this.add.group()
    this._skeletonGroup.add(
      new Skeleton(this, 65, 820, this._player, [
        { x: 65, y: 820 },
        { x: 135, y: 860 },
        { x: 245, y: 855 },
        { x: 135, y: 860 },
        { x: 65, y: 820 }
      ])
    )
    this._skeletonGroup.add(
      new Skeleton(this, -500, 1488, this._player, [
        { x: -500, y: 1488 },
        { x: -262, y: 1488 }
      ])
    )

    this._skeletonGroup.add(
      new Skeleton(this, -384, 1383, this._player, [
        { x: -384, y: 1383 },
        { x: -384, y: 1574 }
      ])
    )

    this._skeletonGroup.add(
      new Skeleton(this, 200, 625, this._player, [
        { x: 200, y: 625 },
        { x: 260, y: 685 },
        { x: 140, y: 685 }
      ])
    )

    this._key1 = new KeyInteractable(this, 250, 300, this._player)
    this._key2 = new KeyInteractable(this, -665, 1530, this._player)
    this.sheets.push(new LoreInteractable(this, 750, 210, this._player, this.enigma1))
    this.sheets[0].setAlpha(0)
    this.sheets.push(new LoreInteractable(this, -410, 1610, this._player, this.enigma2))
    this.sheets[1].setAlpha(0)

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

    const groundLayer = this.map.createLayer('Pavimento', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    const scene1Layer = this.map.createLayer('Scena', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    const wallsLayer = this.map.createLayer('Muri', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    const openedDoorsLayer = this.map.createLayer('PorteAperte', [
      Tiled1,
      Tiled2,
      Tiled3,
      Tiled4,
      Tiled5,
      Tiled6,
      Tiled7
    ])

    const scene2Layer = this.map.createLayer('Scena2', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])
    const scene3Layer = this.map.createLayer('scena3', [Tiled1, Tiled2, Tiled3, Tiled4, Tiled5, Tiled6, Tiled7])

    const chestsLayer = this.map.getObjectLayer('Chests')
    this._chestGroup = this.add.group()

    chestsLayer.objects.forEach(chestTile => {
      this._chestGroup.add(
        new Chest(this, chestTile.x! + chestTile.width! / 2, chestTile.y! + chestTile.width! / 2, this._player)
      )
    })
    //

    wallsLayer.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this._player, wallsLayer)

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
  }

  update(time: number, delta: number) {
    this._inputController.getAllInput()
    this._player.update(time, delta)
    this._key1.update(time, delta)
    this._key2.update(time, delta)
    this.sheets.forEach(sheet => {
      sheet.update(time, delta)
    })
    this._chestGroup.children.entries.forEach(chest => {
      chest.update()
    })
    this._skeletonGroup.children.entries.forEach(skeleton => {
      skeleton.update(time, delta)
    })
  }
}
