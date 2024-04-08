//interfaccia base di tutti le classi
export default interface IBase {
  create(): void
  update(time: number, delta: number): void
}
