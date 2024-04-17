import Player from '../Player'
import Interactable from './Interactable'

export default class KeyInteractable extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'blue-key')
  }
  update(time: number, delta: number): void {
    super.update(time, delta)
    if (this.interacting) {
      this.setPosition(
        Phaser.Math.Interpolation.Linear([this.player.x, this.x], 0.9),
        Phaser.Math.Interpolation.Linear([this.player.y - (this.player.height / 2 + 5), this.y], 0.9)
      )
    }
  }

  onInteract(): void {
    super.onInteract()
    this.player._inventory.keySlot = this
  }

  onCancel(): void {
    super.onCancel()
    this.player._inventory.keySlot = undefined
  }
}
