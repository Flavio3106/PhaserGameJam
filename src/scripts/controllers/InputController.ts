export default class InputController {
  private _scene: Phaser.Scene //scena in cui lavora il controller
  private static _instance: InputController //instanza singleton
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys //cursore freccette movimento
  private _eKey: Phaser.Input.Keyboard.Key //tasto E
  private _escKey: Phaser.Input.Keyboard.Key //tasto ESC
  private _spaceKey: Phaser.Input.Keyboard.Key //tasto SPACE
  private _mousePointer: Phaser.Input.Pointer //pointer mouse

  private _yVelocity: number //moltiplicatore della velocity x, -1: sopra, 0: fermo, 1: sotto
  private _xVelocity: number //moltiplicatore della velocity y, -1: sinistra, 0: fermo, 1: destra
  private _moveAmount: number //quantità di movimento, 0: fermo 1: in movimento in qualsiasi direzione
  private _isInteracting: boolean //flag, true se il player sta interagendo
  private _isAttacking: boolean //flag, true se il player sta attaccando
  private _exit: boolean //flag, true se il player richiede l'uscita da un menu

  //getters
  get xVelocity() {
    return this._xVelocity
  }
  get yVelocity() {
    return this._yVelocity
  }
  get moveAmount() {
    return this._moveAmount
  }

  get isInteracting() {
    return this._isInteracting
  }
  get isAttacking() {
    return this._isAttacking
  }

  get escPressed() {
    return this._exit
  }

  constructor(scene: Phaser.Scene) {
    this._scene = scene
    this._cursors = this._scene.input.keyboard.createCursorKeys()
    this._eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    this._escKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    this._spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this._mousePointer = scene.input.activePointer
  }

  //calcola gli input del movimento
  private getMovementInput(): void {
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

  //controlla gli input di interazione
  private getInteractingFlag(): void {
    if (this._eKey.isDown) {
      this._isInteracting = true
    } else {
      this._isInteracting = false
    }
  }
  //controlla gli input di interazione
  private getAttackingFlag(): void {
    if (this._spaceKey.isDown) {
      this._isAttacking = true
    } else {
      this._isAttacking = false
    }
  }

  //controlla gli input di uscita da un menu
  private getExitFlag(): void {
    if (this._escKey.isDown) {
      this._exit = true
    } else {
      this._exit = false
    }
  }

  getAllInput(): void {
    this.getMovementInput()
    this.getInteractingFlag()
    this.getExitFlag()
    this.getAttackingFlag()
  }
}
