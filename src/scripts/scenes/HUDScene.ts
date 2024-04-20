import Player from '../objects/characters/player/Player'
import Inventory from '../ui/Inventory'
import MainScene from './mainScene'

export default class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD' })
  }

  private _counter: number = 0
  private _hearts = 5
  private _mainScene: MainScene
  private _player: Player
  private _heartsImage: Phaser.GameObjects.Image[] = []
  private keySlotPos: { x: number; y: number }
  private slotOccupied: boolean = false
  private inventory: Inventory
  private keyIcon: Phaser.GameObjects.Image
  private sheet: Phaser.GameObjects.Image

  private sheetObj: Phaser.GameObjects.Text
  private closeButton: Phaser.GameObjects.Image
  private missionBox: Phaser.GameObjects.Image
  private missionTextObj: Phaser.GameObjects.Text
  private keysCounter: number = 0
  private slotLenghtCounter: Phaser.GameObjects.Text

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
    this.sheetObj = this.add
      .text(this.sheet.x - this.sheet.width / 2 + 10, this.sheet.y - this.sheet.height / 2 + 2, ``, {
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
      this.sheetObj.setAlpha(0)
      this.closeButton.setAlpha(0)
      this._mainScene.sheets.forEach(sheet => {
        if (sheet.isActive) {
          sheet.onCancel()
        }
      })
    })
    this.missionBox = this.add.image(this.cameras.main.width - 50, 0, 'mission')
    const text = this.add
      .text(this.missionBox.x - this.missionBox.width / 2 + 2, this.missionBox.y + 2, 'Trova le chiavi', {
        fontSize: '10px',
        fontStyle: 'bold',
        color: 'grey',
        fontFamily: 'Roboto',
        wordWrap: { width: 90 }
      })
      .setResolution(20)
    this.missionTextObj = this.add
      .text(text.x, text.y + 10, `${this.keysCounter}/2`, {
        fontSize: '10px',
        fontStyle: 'bold',
        color: 'grey',
        fontFamily: 'Roboto',
        wordWrap: { width: 90 }
      })
      .setResolution(20)
    this.sheet.setAlpha(0)
    this.sheetObj.setAlpha(0)
    this.closeButton.setAlpha(0)
    this.slotLenghtCounter = this.add
      .text(keySlot.x + keySlot.width - 5, keySlot.y - keySlot.height / 2, `${this.keysCounter}/2`, {
        fontSize: '10px',
        fontStyle: 'bold',
        color: 'white',
        fontFamily: 'Roboto',
        wordWrap: { width: 90 }
      })
      .setResolution(20)
  }

  update(time: number, delta: number): void {
    this.keysCounter = this.inventory.keySlot.length

    this._hearts = this._player._hearts
    this._heartsImage.forEach(heart => {
      heart.destroy()
    })
    this._heartsImage = []
    this.renderHearts()
    this.missionTextObj.text = `${this.keysCounter}/2`
    this.slotLenghtCounter.text = `${this.keysCounter}/2`
    if (this.inventory.keySlot.length !== 0) {
      this.keyIcon = this.add.image(this.keySlotPos.x, this.keySlotPos.y, 'key', 99)
    }
    if (!this.inventory.keySlot && this.slotOccupied) {
      this.keyIcon.destroy()
      this.slotOccupied = false
    }
    if (this._mainScene._player._reading) {
      this._mainScene.sheets.forEach(sheet => {
        if (sheet.isActive) {
          this.sheetObj.text = sheet.sheetText
          this.sheet.setAlpha(1)
          this.sheetObj.setAlpha(1)
          this.closeButton.setAlpha(1)
        }
      })
    }
  }

  renderHearts(): void {
    for (var i = 0; i < this._hearts; i++) {
      this._heartsImage.push(this.add.image(10 + i * 15, 10, 'heartsprite').setScale(0.8))
    }
  }
}
