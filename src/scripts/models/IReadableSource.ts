//interfaccia di un object leggibile, foglio per esempio
export default interface IReadableSource {
  text: Phaser.GameObjects.Text
  sheet: Phaser.GameObjects.Image
  container: Phaser.GameObjects.Container
  scene: Phaser.Scene
  hide(): void
  show(): void
}
