import AnimationController from '../../../controllers/AnimationController'
import InputController from '../../../controllers/InputController'
import IPlayer from '../../../models/IPlayer'
import MainScene from '../../../scenes/mainScene'
import Inventory from '../../../ui/Inventory'

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  _playerAnimationHandler: AnimationController
  _inputController: InputController
  _isInteracting: boolean = false
  _reading: boolean = false
  _inventory: Inventory
  _mainScene: MainScene
  _speed: number = 50
  _facingDirection: string = 'down'
  _defaultBodySize = { width: 0, height: 0 }
  _maxHearts: number = 5
  _hearts: number = this._maxHearts
  _eventEmitter: Phaser.Events.EventEmitter

  _sword: Phaser.GameObjects.Sprite
  _swordRigidBody: Phaser.Physics.Arcade.Body

  _alreadyAttacked: boolean = false

  _scene: Phaser.Scene
  _rigidBody: Phaser.Physics.Arcade.Body

  static _playerIdleSuffixKey: string = 'p-idle-'
  static _playerRunSuffixKey: string = 'p-run-'
  static _playerAttackSuffixKey: string = 'p-attack-'

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Player._playerIdleSuffixKey + 'down', 0)
    this._mainScene = scene as MainScene
    this._inputController = this._mainScene._inputController

    this._scene = scene
    this._scene.physics.world.enableBody(this)
    this._rigidBody = <Phaser.Physics.Arcade.Body>this.body
    this._inventory = new Inventory()

    this._playerAnimationHandler = new AnimationController(scene, this)
    this.create()
  }

  update(time: number, delta: number): void {
    this.move()
    this.sword()

    if (this._inputController.isAttacking) {
      this.attack()
    }
  }

  create(): void {
    this._scene.add.existing(this).setDepth(5)
    //sword
    this._sword = this.scene.add.sprite(this.x, this.y, Player._playerIdleSuffixKey + 'down', 0).setAlpha(0)
    this.scene.physics.world.enableBody(this._sword)
    this._swordRigidBody = <Phaser.Physics.Arcade.Body>this._sword.body

    this._rigidBody.setSize(10, 12)
    this._rigidBody.setOffset(8, 12)
    this._createAnimations()
    this._playerAnimationHandler.play('idle-down')
    this._defaultBodySize = {
      width: this._rigidBody.width,
      height: this._rigidBody.height
    }
    this.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
      const animSuffix = animation.key.split('-')[0]
      if (animSuffix === 'attack') {
        this._swordRigidBody.setSize(this._defaultBodySize.width, this._defaultBodySize.height)
        this._swordRigidBody.setOffset(5, 0)
        this._swordRigidBody.setEnable(false)
      }
    })
    this._swordRigidBody.setEnable(false)
  }

  _createAnimations(): void {
    const frameRates = {
      idle: 3.5,
      run: 8,
      attack: 14
    }
    //*idle
    this._playerAnimationHandler.createAnimation({
      key: 'idle-down',
      frameRate: frameRates.idle,
      frames: this._scene.anims.generateFrameNumbers(Player._playerIdleSuffixKey + 'down', {
        frames: [0, 1, 2, 3]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'idle-left',
      frameRate: frameRates.idle,
      frames: this._scene.anims.generateFrameNumbers(Player._playerIdleSuffixKey + 'left', {
        frames: [0, 1, 2, 3]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'idle-right',
      frameRate: frameRates.idle,
      frames: this._scene.anims.generateFrameNumbers(Player._playerIdleSuffixKey + 'right', {
        frames: [0, 1, 2, 3]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'idle-up',
      frameRate: frameRates.idle,
      frames: this._scene.anims.generateFrameNumbers(Player._playerIdleSuffixKey + 'up', {
        frames: [0, 1, 2, 3]
      }),
      yoyo: false,
      repeat: -1
    })
    //*run animations
    this._playerAnimationHandler.createAnimation({
      key: 'run-down',
      frameRate: frameRates.run,
      frames: this._scene.anims.generateFrameNumbers(Player._playerRunSuffixKey + 'down', {
        frames: [0, 1, 2, 3, 4, 5]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'run-left',
      frameRate: frameRates.run,
      frames: this._scene.anims.generateFrameNumbers(Player._playerRunSuffixKey + 'left', {
        frames: [0, 1, 2, 3, 4, 5]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'run-right',
      frameRate: frameRates.run,
      frames: this._scene.anims.generateFrameNumbers(Player._playerRunSuffixKey + 'right', {
        frames: [0, 1, 2, 3, 4, 5]
      }),
      yoyo: false,
      repeat: -1
    })
    this._playerAnimationHandler.createAnimation({
      key: 'run-up',
      frameRate: frameRates.run,
      frames: this._scene.anims.generateFrameNumbers(Player._playerRunSuffixKey + 'up', {
        frames: [0, 1, 2, 3, 4, 5]
      }),
      yoyo: false,
      repeat: -1
    })

    //*attack

    this._playerAnimationHandler.createAnimation({
      key: 'attack-down',
      frameRate: frameRates.attack,
      frames: this._scene.anims.generateFrameNumbers(Player._playerAttackSuffixKey + 'down', {
        frames: [0, 1, 2, 3, 4, 5, 6]
      }),
      yoyo: false
    })
    this._playerAnimationHandler.createAnimation({
      key: 'attack-left',
      frameRate: frameRates.attack,
      frames: this._scene.anims.generateFrameNumbers(Player._playerAttackSuffixKey + 'left', {
        frames: [0, 1, 2, 3, 4, 5, 6]
      }),
      yoyo: false
    })
    this._playerAnimationHandler.createAnimation({
      key: 'attack-right',
      frameRate: frameRates.attack,
      frames: this._scene.anims.generateFrameNumbers(Player._playerAttackSuffixKey + 'right', {
        frames: [0, 1, 2, 3, 4, 5, 6]
      }),
      yoyo: false
    })
    this._playerAnimationHandler.createAnimation({
      key: 'attack-up',
      frameRate: frameRates.attack,
      frames: this._scene.anims.generateFrameNumbers(Player._playerAttackSuffixKey + 'up', {
        frames: [0, 1, 2, 3, 4, 5, 6]
      }),
      yoyo: false
    })
  }

  private move(): void {
    if (this._inputController.moveAmount > 0) {
      if (this._inputController.xVelocity > 0) {
        this._playerAnimationHandler.play('run-right', { ignoreIfPlaying: true })
        this._facingDirection = 'right'
      } else if (this._inputController.xVelocity < 0) {
        this._playerAnimationHandler.play('run-left', { ignoreIfPlaying: true })
        this._facingDirection = 'left'
      } else if (this._inputController.yVelocity > 0) {
        this._playerAnimationHandler.play('run-down', { ignoreIfPlaying: true })
        this._facingDirection = 'down'
      } else if (this._inputController.yVelocity < 0) {
        this._playerAnimationHandler.play('run-up', { ignoreIfPlaying: true })
        this._facingDirection = 'up'
      }
    } else {
      this._rigidBody.setVelocity(0, 0)
      const anim = this.anims.currentAnim
      if (anim !== null) {
        const parts = anim.key.split('-')
        this._facingDirection = parts[1]
        parts[0] = 'idle'
        this._playerAnimationHandler.play(parts.join('-'), { ignoreIfPlaying: true })
      }
    }
    if (this.anims.isPlaying) {
      this._rigidBody.setVelocity(
        this._inputController.xVelocity * this._speed,
        this._inputController.yVelocity * this._speed
      )
    }
  }

  private sword(): void {
    this._sword.setPosition(this.x, this.y)
  }

  takeDamage(): void {
    if (this._hearts > 0) {
      this._hearts--
      this._rigidBody.setEnable(false)
      setTimeout(() => {
        this._rigidBody.setEnable()
      }, 500)
    } else {
      //muori
    }
  }

  private attack(): void {
    if (!this._alreadyAttacked) {
      this._swordRigidBody.setEnable()
      this._playerAnimationHandler.playInteraction(`attack-${this._facingDirection}`)
      if (this._facingDirection === 'down') {
        this._swordRigidBody.setSize(this._defaultBodySize.width + 20, this._defaultBodySize.height + 15)
        this._swordRigidBody.setOffset(-2, 15)
      } else if (this._facingDirection === 'left') {
        this._swordRigidBody.setSize(this._defaultBodySize.width + 20, this._defaultBodySize.height + 20)
        this._swordRigidBody.setOffset(-12, 0)
      } else if (this._facingDirection === 'right') {
        this._swordRigidBody.setSize(this._defaultBodySize.width + 20, this._defaultBodySize.height + 20)
        this._swordRigidBody.setOffset(10, 0)
      } else if (this._facingDirection === 'up') {
        this._swordRigidBody.setSize(this._defaultBodySize.width + 20, this._defaultBodySize.height + 15)
        this._swordRigidBody.setOffset(-2, -10)
      }
      this._alreadyAttacked = true
      setTimeout(() => {
        this._alreadyAttacked = false
      }, 1000)
    }
  }
}
