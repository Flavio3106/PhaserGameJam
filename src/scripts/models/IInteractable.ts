import AnimationController from '../controllers/AnimationController'
import InputController from '../controllers/InputController'
import IBase from './IBase'

//interfaccia di tutti gli interagibili
export default interface IInteractable extends IBase {
  animationController: AnimationController
  inputController: InputController
  text: Phaser.GameObjects.Text

  canInteract: boolean
  interacting: boolean
  scene: Phaser.Scene

  onInteract(): void
}
