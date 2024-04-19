import InputController from '../../controllers/InputController'
import IReadableSource from '../../models/IReadableSource'

//oggetto che si può leggere
export default class ReadableSource implements IReadableSource {
  text: Phaser.GameObjects.Text //testo del leggibile
  closeButton: Phaser.GameObjects.Image //bottone per chiudere
  sheet: Phaser.GameObjects.Image //foglio
  container: Phaser.GameObjects.Container //container
  scene: Phaser.Scene //scena di appartenenza
  inputController: InputController

  constructor(scene: Phaser.Scene, text: string) {
    this.scene = scene
    this.sheet = scene.add.image(0, 0, 'sheet')
    this.text = scene.add
      .text(0 - 90, -this.sheet.height / 2 + 40, text, {
        fontSize: '18px',
        color: 'black',
        wordWrap: { width: 180 }
      })
      .setOrigin(0, 0)
    this.container = scene.add.container(scene.cameras.main.width / 2, scene.cameras.main.height / 2, [
      this.sheet,
      this.text
    ])
    this.closeButton = scene.add
      .image(this.sheet.width / 2 - 5, -this.sheet.height / 2 + 10, 'close-button')
      .setOrigin(1, 0)
    this.container.add(this.closeButton)
    this.container.depth = 100

    this.hide()
  }

  update(time: number, delta: number): void {
    if (this.inputController.escPressed) {
      this.hide()
    }
  }

  hide(): void {
    this.container.alpha = 0
  }
  show(): void {
    this.container.alpha = 1
  }
  toggle(): void {
    this.container.alpha = this.container.alpha == 1 ? 0 : 1
  }
}
