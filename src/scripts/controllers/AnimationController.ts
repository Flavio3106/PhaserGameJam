//Gestore usato per mantenere lo stato delle animazioni di uno sprite
export default class AnimationController {
  private _isInteracting: boolean
  private _scene: Phaser.Scene
  private _animations: Map<string, Phaser.Types.Animations.Animation>
  private _sprite: Phaser.GameObjects.Sprite

  get isInteracting() {
    return this._isInteracting
  } //ritorna un booleano, true se lo sprite sta riproducendo un'animazione che non si può interrompere

  get scene() {
    return this._scene
  } //ritorna la scena in cui questo handler opera

  get animations() {
    return this._animations
  } //ritorna la mappa contenente tutte le animazioni

  get sprite() {
    return this._sprite
  } //ritorna lo sprite correlato a questo handler

  constructor(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite) {
    this._isInteracting = false
    this._scene = scene
    this._animations = new Map<string, Phaser.Types.Animations.Animation>()
    this._sprite = sprite
    this.sprite.on('animationcomplete', () => {
      if (this.isInteracting) {
        this._isInteracting = false
      }
    })
  }

  //setta un'animazione da riprodurre nel caso in cui nessun'altra animazione sta venendo riprodotta
  setIdle(key: string) {
    this.sprite.on('animationcomplete', () => {
      this.play(key)
    })
  }

  //crea un'animazione, lancia un'errore nel caso in cui la key dell'animazione fosse null
  createAnimation(animation: Phaser.Types.Animations.Animation): void {
    if (animation.key == null) {
      throw new ErrorEvent('key of [Phaser.Types.Animations.Animation.key] must not be null')
    }
    this._scene.anims.create(animation)
    this._animations.set(animation.key!, animation)
  }

  //riproduce un'animazione se non ne sta venendo riprodotta un'interazione, opzionalmente, si può decidere se immettere l'animazione in una coda
  play(key: string, params?: { addToQueue?: boolean; ignoreIfPlaying?: boolean }): void {
    if (!params) {
      params = { addToQueue: false, ignoreIfPlaying: false }
    }
    if (!this.isInteracting) {
      this._sprite.play(key, params.ignoreIfPlaying)
    } else {
      if (params.addToQueue) {
        this.sprite.anims.chain(key)
      }
    }
  }

  //riproduce un interazione, ovvero un'animazione che non si può interrompere, opzionalmente, si può decidere se immettere l'animazione in una coda
  playInteraction(key: string, params?: { addToQueue?: boolean; ignoreIfPlaying?: boolean }) {
    if (!params) {
      params = { addToQueue: false, ignoreIfPlaying: false }
    }
    if (!this.isInteracting) {
      this._sprite.play(key, params.ignoreIfPlaying)
      this._isInteracting = true
    } else {
      if (params.addToQueue) {
        this.sprite.anims.chain(key)
      }
    }
  }

  //ritorna un'animazione in base alla chiave passata
  getAnimationByKey(key: string): Phaser.Types.Animations.Animation | undefined {
    return this.animations.get(key)
  }

  //setta come completata la corrente animazione riprodotta
  setCompleted(): void {
    this.sprite.anims.complete()
  }
}
