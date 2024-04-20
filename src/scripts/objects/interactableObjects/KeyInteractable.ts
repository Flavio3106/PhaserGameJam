import HUDScene from '../../scenes/HUDScene'
import Player from '../characters/player/Player'
import Interactible from './Interactable'

export default class KeyInteractable extends Interactible {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'key', 99)
  }
  update(time: number, delta: number): void {
    super.update(time, delta)
    if (this.interacting) {
      this.setPosition(this.player.x, this.player.y)
    }
  }

  onInteract(): void {
    if (!this.interacting) {
      this.setAlpha(0)
      this.player._inventory.keySlot.push(this)
    }
    super.onInteract()
  }

  onCancel(): void {
    if (this.interacting) {
      this.setAlpha(1)
      this.player._inventory.keySlot.pop()
    }
    super.onCancel()
  }
}
