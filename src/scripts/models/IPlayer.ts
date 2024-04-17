export default interface IPlayer {
  _createAnimations(): void
  create(): void
  update(time: number, delta: number): void
}
