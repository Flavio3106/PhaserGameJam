import Player from '../objects/characters/player/Player'
import Inventory from '../ui/Inventory'
import MainScene from './mainScene'

export default class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD' })
  }

  private _counter: number = 300
  private _hearts = 5
  private _mainScene: MainScene
  private _player: Player
  private _heartsImage: Phaser.GameObjects.Image[] = []
  private keySlotPos: { x: number; y: number }
  private slotOccupied: boolean = false
  private inventory: Inventory
  private keyIcon: Phaser.GameObjects.Image
  private sheet: Phaser.GameObjects.Image
  private enigmaText: string =
    "Dove le ossa si perdono nella penombra, cerca il guardiano silenzioso della porta segreta. Con attenzione, segui il suo sguardo per individuare la chiave che apre il passaggio verso l'ignoto."
  private enigmaObj: Phaser.GameObjects.Text
  private closeButton: Phaser.GameObjects.Image
  private missionBox: Phaser.GameObjects.Image
  private missionTextObj: Phaser.GameObjects.Text

  getCounter(): number {
    return this._counter
  }

  public updateCounter(quantity: number): void {
    this._counter = quantity
  }

  create() {
    this.renderHearts()
    this._mainScene = this.scene.get('MainScene') as MainScene
    this.inventory = this._mainScene._player._inventory
    this._player = this._mainScene._player

    const mineral = this.add.image(10, 27, 'minerals', 7).setScale(0.88)
    this.add
      .text(mineral.x + 10, mineral.y - mineral.height / 2, `${this._counter}`, {
        fontSize: '10px',
        fontStyle: 'bold',
        fontFamily: 'Roboto'
      })
      .setResolution(20)
    const keySlot = this.add.image(200, 180, 'inventory-slot')
    this.keySlotPos = { x: keySlot.x, y: keySlot.y }
    //sheet
    this.sheet = this.add.image(320, 100, 'sheet')
    this.enigmaObj = this.add
      .text(this.sheet.x - this.sheet.width / 2 + 10, this.sheet.y - this.sheet.height / 2 + 2, `${this.enigmaText}`, {
        fontSize: '10px',
        fontStyle: 'bold',
        color: 'black',
        fontFamily: 'Roboto',
        wordWrap: { width: 90 }
      })
      .setResolution(20)
    this.closeButton = this.add
      .image(this.sheet.x + this.sheet.width / 2 - 2, this.sheet.y - this.sheet.height / 2 + 5, 'close-button')
      .setDepth(5)
    this.closeButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.sheet.setAlpha(0)
      this.enigmaObj.setAlpha(0)
      this.closeButton.setAlpha(0)
      this._mainScene._sheet.onCancel()
    })
    this.missionBox = this.add.image(this.cameras.main.width - 50, 0, 'mission')
    this.missionTextObj = this.add
      .text(this.missionBox.x - this.missionBox.width / 2 + 2, this.missionBox.y + 2, 'Trova la chiave', {
        fontSize: '10px',
        fontStyle: 'bold',
        color: 'black',
        fontFamily: 'Roboto',
        wordWrap: { width: 90 }
      })
      .setResolution(20)
    this.sheet.setAlpha(0)
    this.enigmaObj.setAlpha(0)
    this.closeButton.setAlpha(0)
  }

  update(time: number, delta: number): void {
    this._hearts = this._player._hearts
    this._heartsImage.forEach(heart => {
      heart.destroy()
    })
    this._heartsImage = []
    this.renderHearts()
    if (this.inventory.keySlot && !this.slotOccupied) {
      this.missionTextObj.text = 'Chiave trovata'
      this.keyIcon = this.add.image(this.keySlotPos.x, this.keySlotPos.y, 'key', 99)
      this.slotOccupied = true
    }
    if (!this.inventory.keySlot && this.slotOccupied) {
      this.keyIcon.destroy()
      this.slotOccupied = false
    }
    if (this._mainScene._player._reading) {
      this.sheet.setAlpha(1)
      this.enigmaObj.setAlpha(1)
      this.closeButton.setAlpha(1)
    }
  }

  renderHearts(): void {
    for (var i = 0; i < this._hearts; i++) {
      this._heartsImage.push(this.add.image(10 + i * 15, 10, 'heartsprite').setScale(0.8))
    }
  }
}
