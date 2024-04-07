import AnimationController from '../controllers/AnimationController'
import InputController from '../controllers/InputController'
import IPlayer from '../models/IPlayer'

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  _playerAnimationHandler: AnimationController
  _inputController: InputController

  _scene: Phaser.Scene
  _rigidBody: Phaser.Physics.Arcade.Body

  static _playerSpritesheet: string = 'player-spritesheet'

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Player._playerSpritesheet, 8)

    this._scene = scene
    this._scene.physics.world.enableBody(this)
    this._rigidBody = <Phaser.Physics.Arcade.Body>this.body
    this._rigidBody.setAllowGravity(false)

    //handlers
    this._inputController = InputController.getInstance(scene)
    this._playerAnimationHandler = new AnimationController(scene, this)
    this.create()
  }

  update(time: number, delta: number): void {
    this.move()
  }

  create(): void {
    this._createAnimations()
  }

  _createAnimations(): void {
    this._playerAnimationHandler.createAnimation({
      key: 'idle',
      frameRate: 10,
      frames: this._scene.anims.generateFrameNumbers(Player._playerSpritesheet, { frames: [8, 9, 10, 11] }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'running',
      frameRate: 15,
      frames: this._scene.anims.generateFrameNumbers(Player._playerSpritesheet, { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
      yoyo: false
    })
    this._playerAnimationHandler.setIdle('idle')
  }
  private move(): void {
    this._inputController.getMovementInput()

    if (this._inputController.moveAmount > 0) {
      if (this._inputController.xVelocity >= 0) {
        this.setFlipX(false)
      } else {
        this.setFlipX(true)
      }
      this._playerAnimationHandler.play('running', { ignoreIfPlaying: true })
      if (this.anims.isPlaying) {
        this._rigidBody.setVelocity(this._inputController.xVelocity * 200, this._inputController.yVelocity * 200)
      }
    } else {
      this._rigidBody.setVelocity(0, 0)
    }
  }
}
