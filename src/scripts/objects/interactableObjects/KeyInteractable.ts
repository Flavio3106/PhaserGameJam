import Player from '../Player'
import Interactable from './Interactable'

export default class KeyInteractable extends Interactable {
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, assetName: string, frame?: number | string) {
    super(scene, x, y, player, assetName, frame)
  }
  update(time: number, delta: number): void {
    super.update(time, delta)
  }

  onInteract(): void {
    super.onInteract()
  }
  onCancel(): void {
    super.onCancel()
  }
}
