import AnimationController from '../../controllers/AnimationController'
import InputController from '../../controllers/InputController'
import IInteractable from '../../models/IInteractable'
import MainScene from '../../scenes/mainScene'
import Player from '../characters/player/Player'

//classe base di un interactable
export default class Interactable extends Phaser.GameObjects.Sprite implements IInteractable {
  animationController: AnimationController
  inputController: InputController
  mainScene: MainScene
  text: Phaser.GameObjects.Text

  interacting: boolean = false

  scene: Phaser.Scene
  canInteract: boolean = false
  player: Player
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, assetName: string, frame?: number | string) {
    super(scene, x, y, assetName, frame)
    this.mainScene = scene as MainScene
    this.inputController = this.mainScene._inputController
    this.scene = scene
    this.player = player
    this.create()
  }

  create(): void {
    this.animationController = new AnimationController(this.scene, this)

    this.text = this.scene.add
      .text(this.x, this.y - (this.height / 2 + 20), 'Interagisci[E]', {
        color: 'black',
        fontSize: 'px',
        fontFamily: 'Pixelify'
      })
      .setDepth(5)

    this.text.x -= this.text.width / 2
    this.text.alpha = 0

    this.scene.add.existing(this).setDepth(4)
  }

  update(time: number, delta: number): void {
    this.text.setPosition(this.x - this.text.width / 2, this.y - (this.height / 2 + 20))
    this.text.alpha = 0
    this.canInteract = false

    if (this.getDistanceToPlayer() < 100 && !this.player._isInteracting) {
      this.canInteract = true
    }
    if (this.canInteract) {
      this.text.alpha = 1
      if (this.inputController.isInteracting) {
        this.onInteract()
      }
    }
    if (this.interacting) {
      this.text.alpha = 0
      if (this.inputController.escPressed) {
        this.onCancel()
        this.text.alpha = 1
      }
    }
  }

  //ottiene la distanza dal player
  getDistanceToPlayer(): number {
    return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y)
  }

  //chiamata quando si interagisce
  onInteract(): void {
    this.interacting = true
    this.player._isInteracting = true
  }

  //chiamata quando si cancella l'interazione
  onCancel(): void {
    this.interacting = false
    this.player._isInteracting = false
  }
}
