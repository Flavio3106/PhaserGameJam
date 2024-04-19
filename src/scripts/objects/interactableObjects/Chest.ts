import Player from '../characters/player/Player'
import Interactable from './Interactable'

export default class Chest extends Interactable {
  isOpen: boolean = false
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, player, 'chest')
  }

  open(): void {
    if (!this.isOpen) {
      this.isOpen = true
      this.interacting = true
      this.player._inventory.addBauxite()
      this.scene.sound.play('chest-open')
    }
  }
  create(): void {
    super.create()
    this.rigidBody.setImmovable()
    this.rigidBody.setSize(this.rigidBody.width - 5, this.rigidBody.height - 5)
  }

  update(time: number, delta: number): void {
    super.update(time, delta)
  }
  onInteract(): void {
    this.open()
  }
}
