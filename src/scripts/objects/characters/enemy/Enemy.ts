import AnimationController from '../../../controllers/AnimationController'
import IEnemy from '../../../models/IEnemy'
import MainScene from '../../../scenes/mainScene'
import Player from '../player/Player'

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy {
  animationController: AnimationController
  player: Player
  mainScene: MainScene
  private wayPoints: { x: number; y: number }[] = []
  canGo: boolean = true

  constructor(scene: Phaser.Scene, x: number, y: number, assetName: string, player: Player, frame?: number | string) {
    super(scene, x, y, assetName, frame)
    this.player = player
    this.mainScene = scene as MainScene
    this.animationController = new AnimationController(scene, this)
    const mapW = this.mainScene._map.widthInPixels,
      mapH = this.mainScene._map.heightInPixels
    this.wayPoints = [
      { x: mapW / 2 - 50, y: mapH / 2 - 50 },
      { x: mapW / 2 - 100, y: mapH / 2 - 75 }
    ]
  }

  create(): void {}

  update(time: number, delta: number): void {}

  patrol(): void {
    if (this.wayPoints.length === 0) return

    let index = 0 // Indice del punto attuale

    const moveNext = () => {
      if (this.canGo) {
        const currentPoint = this.wayPoints[index]
        const nextIndex = (index + 1) % this.wayPoints.length
        const nextPoint = this.wayPoints[nextIndex]
        const distance = Phaser.Math.Distance.Between(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y)
        const duration = distance * 50
        const delay = 3000
        let flipX: boolean = false
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