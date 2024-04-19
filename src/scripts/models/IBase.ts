//interfaccia base di tutti le classi
export default interface IBase {
  update(time: number, delta: number): void
  create(): void
}
