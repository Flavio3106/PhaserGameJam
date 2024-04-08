import Player from '../Player'
import ReadableSource from '../ui/ReadableObject'
import Interactable from './Interactable'

export default class LoreInteractable extends Interactable {
  readableSource: ReadableSource
  readableSourceText: string

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, readableSourceText: string) {
    super(scene, x, y, player, 'player-spritesheet', 8) //TODO: Da implementare
    this.readableSourceText = readableSourceText
    this.create()
  }

  create(): void {
    super.create()

    this.readableSource = new ReadableSource(this.scene, this.readableSourceText)
    this.readableSource.hide()
  }

  update(time: number, delta: number): void {
    super.update(time, delta)
    this.readableSource.update(time, delta)
  }

  onInteract(): void {
    super.onInteract()
    this.readableSource.show()
  }
}
