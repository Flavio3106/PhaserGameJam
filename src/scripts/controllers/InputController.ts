export default class InputController {
  private _scene: Phaser.Scene
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private _yVelocity: number
  private _xVelocity: number
  private _moveAmount: number
  private static _instance: InputController

  get xVelocity() {
    return this._xVelocity
  }
  get yVelocity() {
    return this._yVelocity
  }
  get moveAmount() {
    return this._moveAmount
  }

  private constructor(scene: Phaser.Scene) {
    this._scene = scene
    this._cursors = this._scene.input.keyboard.createCursorKeys()
  }

  static getInstance(scene: Phaser.Scene) {
    if (!InputController._instance) {
      return new InputController(scene)
    }
    return InputController._instance
  }

  getMovementInput(): void {
    if (this._cursors.right.isDown) {
      this._xVelocity = 1
    }
    if (this._cursors.left.isDown) {
      this._xVelocity = -1
    }
    if (this._cursors.up.isDown) {
      this._yVelocity = -1
    }
    if (this._cursors.down.isDown) {
      this._yVelocity = 1
    }

    if (
      !this._cursors.left.isDown &&
      !this._cursors.right.isDown &&
      !this._cursors.up.isDown &&
      !this._cursors.down.isDown
    ) {
      this._xVelocity = 0
      this._yVelocity = 0
    }

    this._moveAmount = Math.min(Math.abs(this.xVelocity) + Math.abs(this.yVelocity), 1)
  }
}
