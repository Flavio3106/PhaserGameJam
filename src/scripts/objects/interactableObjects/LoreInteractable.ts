import HUDScene from '../../scenes/HUDScene'
import Player from '../characters/player/Player'
import Sheet from '../Readables/Sheet'
import Interactible from './Interactable'

export default class LoreInteractable extends Interactible {
  isActive: boolean = false
  hudScene: HUDScene
  sheetText: string = ''
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, sheetText: string) {
    super(scene, x, y, player, 'chest')
    this.sheetText = sheetText
  }

  onInteract(): void {
    super.onInteract()
    this.player._reading = true
    this.isActive = true
  }

  onCancel(): void {
    super.onCancel()
    this.player._reading = false
    this.isActive = false
  }
}
