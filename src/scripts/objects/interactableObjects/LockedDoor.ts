import Player from '../characters/player/Player'
import Interactible from './Interactable'
import KeyInteractable from './KeyInteractable'

export default class Door extends Interactible {
  key: KeyInteractable
  staticBody: Phaser.Physics.Arcade.StaticBody
  locked: boolean = true

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, key: KeyInteractable) {
    super(scene, x, y, player, 'door')
    this.key = key
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY)
  }

  update(time: number, delta: number): void {
    if (this.locked) {
      this.text.alpha = 0
      this.canInteract = false

      if (this.getDistanceToPlayer() < 100) {
        this.canInteract = true
      }
      if (this.canInteract) {
        this.text.alpha = 1
        if (this.inputController.isInteracting) {
          this.onInteract()
        }
      }
    }
  }

  onInteract(): void {
    this.text.alpha = 0
    if (this.key === this.player._inventory.keySlot) {
      this.locked = false
      console.log('door unlocked')
    } else {
      console.log('cannot interact')
    }
  }
}
