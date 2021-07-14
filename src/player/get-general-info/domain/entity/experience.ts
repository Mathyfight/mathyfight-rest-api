export class Experience {
  constructor(readonly level: number, readonly current: number) {}

  readonly total = this.level * 100;
}
