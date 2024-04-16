import AnimationController from '../../controllers/AnimationController'
import InputController from '../../controllers/InputController'
import IInteractable from '../../models/IInteractable'
import Player from '../Player'

//classe base di un interactable
export default class Interactable extends Phaser.GameObjects.Container implements IInteractable {
  interacting: boolean

  animationController: AnimationController
  text: Phaser.GameObjects.Text
  sprite: Phaser.GameObjects.Sprite

  pos: { x: number; y: number }
  scene: Phaser.Scene
  canInteract: boolean = false
  player: Player
  inputController: InputController

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, assetName: string, frame?: number | string) {
    super(scene, x, y)
    this.inputController = InputController.getInstance(scene)
    this.animationController = new AnimationController(scene, player)
    this.scene = scene
    this.player = player
    this.pos = { x, y }
    this.sprite = this.scene.add.sprite(x, y, assetName, frame)
    this.text = scene.add.text(this.sprite.x, this.sprite.y - 50, 'Interagisci[E]', {
      fontSize: '15px',
      color: 'black'
    })
    this.text.alpha = 0
    this.text.x -= this.text.width / 2
    this.add([this.sprite, this.text])
  }

  create(): void {}
  update(time: number, delta: number): void {
    this.text.alpha = 0
    this.canInteract = false

    this.inputController.getInteractingFlag()
    this.inputController.getExitFlag()

    if (!this.interacting) {
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

    if (this.inputController.escPressed) {
      this.onCancel()
    }
  }

  //ottiene la distanza dal player
  getDistanceToPlayer(): number {
    return Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.player.x, this.player.y)
  }

  //chiamata quando si interagisce
  onInteract(): void {
    this.interacting = true
    console.log('interacting')
  }
  //chiamata quando si cancella l'interazione
  onCancel(): void {
    this.interacting = false
    console.log('not interacting')
  }
}
