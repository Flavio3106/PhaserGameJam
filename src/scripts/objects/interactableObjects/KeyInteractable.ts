import Player from '../Player'
import Interactible from './Interactable'

export default class KeyInteractable extends Interactible {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'blue-key')
  }
  update(time: number, delta: number): void {
    super.update(time, delta)
    if (this.interacting) {
      if (!(this.x === this.player.x && this.y === this.player.y - 10)) {
        this.setPosition(
          Phaser.Math.Interpolation.Linear([this.player.x, this.x], 0.9),
          Phaser.Math.Interpolation.Linear([this.player.y - 10, this.y], 0.9)
        )
      } else {
        this.setPosition(this.player.x, this.player.y - 10)
      }
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
