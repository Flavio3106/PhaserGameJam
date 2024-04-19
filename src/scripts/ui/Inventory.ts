<<<<<<< HEAD
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'

export default class Inventory {
  keySlot?: KeyInteractable
  private _bauxite: number = 0

  get bauxite() {
    return this._bauxite
  }

  addBauxite() {
    let min: number = 1,
      max: number = 3
    min = Math.ceil(min)
    max = Math.floor(max)

    this._bauxite += Math.floor(Math.random() * (max - min + 1)) + min
  }
}
=======
import KeyInteractable from '../objects/interactableObjects/KeyInteractable'

export default class Inventory {
  keySlot?: KeyInteractable
  private _bauxite: number = 0

  get bauxite() {
    return this._bauxite
  }

  addBauxite() {
    let min: number = 1,
      max: number = 3
    min = Math.ceil(min)
    max = Math.floor(max)

    this._bauxite += Math.floor(Math.random() * (max - min + 1)) + min
  }
}
>>>>>>> 9819cb9e93479d1f6c077a793bdad1d8d41b19bd
