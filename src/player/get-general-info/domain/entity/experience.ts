export class Experience {
  constructor(readonly level: number, readonly current: number) {}

  get total(): number {
    return this.level * 100;
  }
}
