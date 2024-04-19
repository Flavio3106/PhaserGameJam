import Player from '../Player'
import Sheet from '../Readables/Sheet'
import Interactible from './Interactable'

export default class LoreInteractable extends Interactible {
  sheet: Sheet

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'sheet-icon')
    this.sheet = new Sheet(scene, 'Lorem ipsum')
    this.sheet.closeButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.onCancel()
    })
  }

  onInteract(): void {
    super.onInteract()
    this.player._reading = true
    this.sheet.toggle()
  }

  onCancel(): void {
    super.onCancel()
    this.player._reading = false

    this.sheet.hide()
  }
}
