import KeyInteractable from '../objects/interactableObjects/KeyInteractable'

export default class Inventory {
  keySlot: Array<KeyInteractable> = []
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
