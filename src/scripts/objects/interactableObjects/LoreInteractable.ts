import Player from '../characters/player/Player'
import Sheet from '../Readables/Sheet'
import Interactible from './Interactable'

export default class LoreInteractable extends Interactible {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'chest')
  }

  onInteract(): void {
    super.onInteract()
    this.player._reading = true
  }

  onCancel(): void {
    super.onCancel()
    this.player._reading = false
  }
}
