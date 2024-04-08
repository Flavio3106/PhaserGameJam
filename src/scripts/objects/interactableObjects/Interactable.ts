import AnimationController from '../../controllers/AnimationController'
import InputController from '../../controllers/InputController'
import IInteractable from '../../models/IInteractable'
import Player from '../Player'

//classe base di un interactable
export default class Interactable extends Phaser.GameObjects.Sprite implements IInteractable {
  animationController: AnimationController
  description: Phaser.GameObjects.Text

  position: { x: number; y: number }
  scene: Phaser.Scene
  canInteract: boolean
  player: Player
  inputController: InputController
  constructor(scene: Phaser.Scene, x: number, y: number, player: Player, assetName: string, frame?: number | string) {
    super(scene, x, y, assetName, frame)
    this.position = { x: x, y: y }
    this.scene = scene
    this.player = player
    this.create()
  }

  create(): void {
    this.animationController = new AnimationController(this.scene, this)
    this.inputController = InputController.getInstance(this.scene)
    this.canInteract = false
    this.description = new Phaser.GameObjects.Text(
      this.scene,
      this.position.x,
      this.position.y - (this.height / 2 + 20),
      'Interagisci[E]',
      {
        color: 'black',
        fontSize: '15px'
      }
    )
    this.scene.add.existing(this.description)
    this.description.x -= this.description.width / 2
    this.description.alpha = 0
  }

  update(time: number, delta: number): void {
    this.description.alpha = 0
    this.canInteract = false
    this.inputController.getInteractingFlag()
    if (this.getDistanceToPlayer() < 100) {
      this.canInteract = true
    }
    if (this.canInteract) {
      this.description.alpha = 1
      if (this.inputController.isInteracting) {
        this.onInteract()
      }
    }
  }

  //ottiene la distanza dal player
  getDistanceToPlayer(): number {
    return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y)
  }

  //chiamata quando si interagisce
  onInteract(): void {}
}
