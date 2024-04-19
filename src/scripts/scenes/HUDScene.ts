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
    const keySlot = this.add.image(10, 190, 'inventory-slot')
    this.keySlotPos = { x: keySlot.x, y: keySlot.y }
  }

  update(time: number, delta: number): void {
    this._hearts = this._player._hearts
    this._heartsImage.forEach(heart => {
      heart.destroy()
    })
    this._heartsImage = []
    this.renderHearts()
    if (this.inventory.keySlot && !this.slotOccupied) {
      this.keyIcon = this.add.image(this.keySlotPos.x, this.keySlotPos.y, 'chest')
      this.slotOccupied = true
    }
    if (!this.inventory.keySlot && this.slotOccupied) {
      this.keyIcon.destroy()
      this.slotOccupied = false
    }
  }

  renderHearts(): void {
    for (var i = 0; i < this._hearts; i++) {
      this._heartsImage.push(this.add.image(10 + i * 15, 10, 'heartsprite').setScale(0.8))
    }
  }
}
