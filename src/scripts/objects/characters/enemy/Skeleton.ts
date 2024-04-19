import Player from '../player/Player'
import Enemy from './Enemy'

export default class Skeleton extends Enemy {
  static _skeletonIdleKey: string = 's-idle'
  static _skeletonRunKey: string = 's-run'

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 's-idle', player, 0)
    this.create()
  }

  create(): void {
    this.scene.add.existing(this).setDepth(5)
    this.createAnimations()
  }

  createAnimations(): void {
    const frameRates = {
      idle: 5,
      run: 13
    }
    this.animationController.createAnimation({
      key: 'idle',
      frameRate: frameRates.idle,
      frames: this.scene.anims.generateFrameNumbers(Skeleton._skeletonIdleKey, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }),
      yoyo: false,
      repeat: -1
    })
    this.animationController.createAnimation({
      key: 'run',
      frameRate: frameRates.run,
      frames: this.scene.anims.generateFrameNumbers(Skeleton._skeletonRunKey, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }),
      yoyo: false,
      repeat: -1
    })
    this.animationController.play('idle')
  }

  update(time: number, delta: number): void {
    this.patrol()
  }
}