import InputController from '../../controllers/InputController'
import IReadableSource from '../../models/IReadableSource'

//oggetto che si può leggere
export default class ReadableSource implements IReadableSource {
  text: Phaser.GameObjects.Text //testo del leggibile
  close: Phaser.GameObjects.Text //bottone per chiudere
  sheet: Phaser.GameObjects.Image //foglio
  container: Phaser.GameObjects.Container //container
  scene: Phaser.Scene //scena di appartenenza
  inputController: InputController

  constructor(scene: Phaser.Scene, text: string) {
    this.scene = scene
    this.inputController = InputController.getInstance(scene)
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
    this.close = scene.add
      .text(this.sheet.width / 2 - 5, -this.sheet.height / 2 + 10, 'Chiudi[ESC]', { color: 'black', fontSize: '15px' })
      .setOrigin(1, 0)
    this.container.add(this.close)
    this.container.depth = 100
    this.close.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.hide()
    })
  }

  update(time: number, delta: number): void {
    this.inputController.getExitFlag()
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
