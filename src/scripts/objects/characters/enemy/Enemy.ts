import AnimationController from '../../../controllers/AnimationController'
import IEnemy from '../../../models/IEnemy'
import MainScene from '../../../scenes/mainScene'
import Player from '../player/Player'
import Skeleton from './Skeleton'

export default class Enemy extends Phaser.Physics.Arcade.Sprite implements IEnemy {
  animationController: AnimationController
  player: Player
  mainScene: MainScene
  rigidBody: Phaser.Physics.Arcade.Body
  dead: boolean = false
  deadAnimationFinished: boolean = false
  private wayPoints: { x: number; y: number }[] = []
  canGo: boolean = true

  constructor(scene: Phaser.Scene, x: number, y: number, assetName: string, player: Player, frame?: number | string) {
    super(scene, x, y, assetName, frame)
    this.player = player
    this.mainScene = scene as MainScene
    this.animationController = new AnimationController(scene, this)
    this.scene.physics.world.enableBody(this)
    this.rigidBody = <Phaser.Physics.Arcade.Body>this.body

    this.wayPoints = []
    this.scene.add.existing(this).setDepth(4)
    this.scene.physics.add.overlap(player._sword, this, (sword, skeleton) => {
      ;(skeleton as Skeleton).die()
    })
    this.scene.physics.add.collider(player, this, (playerObj, skeletonObj) => {
      player.takeDamage()
    })

    this.rigidBody.setImmovable()
  }

  create(): void {}

  update(time: number, delta: number): void {}

  die(): void {
    this.dead = true
    this.rigidBody.setEnable(false)
  }

  dealDamage(): void {}

  patrol(): void {
    if (this.wayPoints.length === 0) return

    let index = 0 // Indice del punto attuale
    const moveNext = () => {
      if (this.dead) {
        if (!this.deadAnimationFinished) {
          this.scene.tweens.killAll()
          this.animationController.play('dead', { ignoreIfPlaying: true })
          this.deadAnimationFinished = true
        }
        return
      }

      if (this.canGo) {
        if (this.dead) return
        const currentPoint = this.wayPoints[index]
        const nextIndex = (index + 1) % this.wayPoints.length
        const nextPoint = this.wayPoints[nextIndex]
        const distance = Phaser.Math.Distance.Between(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y)
        const duration = distance * 50
        const delay = 500
        let flipX: boolean = false
        this.rigidBody.setOffset(5, 5)

        if (currentPoint.x > nextPoint.x) {
          flipX = true
        }

        this.scene.tweens.add({
          targets: this,
          x: nextPoint.x,
          y: nextPoint.y,
          duration: duration,
          delay: delay,
          onStart: () => {
            this.animationController.play('run')
            this.setFlipX(flipX)
          },
          onComplete: () => {
            this.animationController.play('idle')
            index = nextIndex
            this.canGo = true
            moveNext()
          }
        })

        this.canGo = false
      }
    }

    moveNext() // Inizia il movimento
  }

  addPoint(point: { x: number; y: number }) {
    this.wayPoints.push(point)
  }
  addPoints(points: { x: number; y: number }[]) {
    this.wayPoints = [...this.wayPoints, ...points]
  }
}
