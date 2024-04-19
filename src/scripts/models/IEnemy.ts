import AnimationController from '../controllers/AnimationController'
import IBase from './IBase'

export default interface IEnemy extends IBase {
  animationController: AnimationController
  patrol(): void
}
