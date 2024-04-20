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
  _mainCamera: Phaser.Cameras.Scene2D.Camera

  //Tilemap
  map: Phaser.Tilemaps.Tilemap
  //Layers
  chestsLayer: Phaser.Tilemaps.ObjectLayer
  keysLayer: Phaser.Tilemaps.ObjectLayer
  sheetsLayer: Phaser.Tilemaps.ObjectLayer

  //groups
  _chestGroup: Phaser.GameObjects.Group
  _skeletonGroup: Phaser.GameObjects.Group
  _keyGroup: Phaser.GameObjects.Group
  _sheetGroup: Phaser.GameObjects.Group

  //enigmas texts
  private enigmaMap: Map<string, string>

  //inputController
  _inputController: InputController

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.sound.volume = 0.25
    this._inputController = new InputController(this)
    this.enigmaMap = new Map()
    this.enigmaMap.set(
      'enigma1',
      'Dove le ossa si perdono nella penombra, cerca il guardiano silenzioso della porta segreta. Con attenzione, segui il suo sguardo per individuare la chiave.'
    )
    this.enigmaMap.set(
      'enigma2',
      "Nel cuore oscuro delle Catacombe, dove le ombre si fondono con le pareti di pietra, cerca il segno dell'ultimo sacerdote. Là troverai la chiave che apre la via verso la luce"
    )
    this._mainCamera = this.cameras.main
    this.map = this.make.tilemap({ key: 'catacombs', tileWidth: 16, tileHeight: 16 })
    this._player = new Player(this, 100, 680)

    //*Groups
    this._skeletonGroup = this.add.group()
    this._chestGroup = this.add.group()
    this._keyGroup = this.add.group()
    this._sheetGroup = this.add.group()

    this.setTilemap()
    this.spawnSkeletons()
    this.spawnChests()
    this.spawnKeys()
    this.spawnSheets()

    this._mainCamera.startFollow(this._player, true, 0.5, 0.5)
  }

  spawnSkeletons(): void {
    this._skeletonGroup.add(
      new Skeleton(this, this._player, [
        { x: 335, y: 1100 },
        { x: 335, y: 820 }
      ])
    )

    this._skeletonGroup.add(
      new Skeleton(this, this._player, [
        { x: 275, y: 1665 },
        { x: 425, y: 1665 }
      ])
    )

    this._skeletonGroup.add(
      new Skeleton(this, this._player, [
        { x: 525, y: 662 },
        { x: 578, y: 662 },
        { x: 578, y: 707 },
        { x: 520, y: 707 }
      ])
    )
    this._skeletonGroup.add(
      new Skeleton(this, this._player, [
        { x: 578, y: 707 },
        { x: 520, y: 707 },
        { x: 525, y: 662 },
        { x: 578, y: 662 }
      ])
    )
  }

  spawnChests(): void {
    this.chestsLayer.objects.forEach(chestTile => {
      this._chestGroup.add(
        new Chest(this, chestTile.x! + chestTile.width! / 2, chestTile.y! + chestTile.width! / 2, this._player)
      )
    })
  }

  spawnKeys(): void {
    this.keysLayer.objects.forEach(key => {
      this._keyGroup.add(new KeyInteractable(this, key.x!, key.y!, this._player).setAlpha(1))
    })
  }

  spawnSheets(): void {
    let index = 0
    this.sheetsLayer.objects.forEach(sheet => {
      index++
      this._sheetGroup.add(
        new LoreInteractable(this, sheet.x!, sheet.y!, this._player, this.enigmaMap.get(`enigma${index}`)!)
      )
    })
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

    this.chestsLayer = this.map.getObjectLayer('Chests')
    this.keysLayer = this.map.getObjectLayer('Chiavi')
    this.sheetsLayer = this.map.getObjectLayer('Enigmi')

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

    this._keyGroup.children.entries.forEach(key => {
      key.update()
    })
    this._sheetGroup.children.entries.forEach(sheet => {
      sheet.update()
    })
    this._chestGroup.children.entries.forEach(chest => {
      chest.update()
    })
    this._skeletonGroup.children.entries.forEach(skeleton => {
      skeleton.update(time, delta)
    })
  }
}
