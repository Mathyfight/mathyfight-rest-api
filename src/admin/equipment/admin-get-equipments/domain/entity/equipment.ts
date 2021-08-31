export class Equipment {
  constructor(
    readonly id: string,
    readonly imageUrl: string,
    readonly name: string,
    readonly description: string,
    readonly buyPrice: number,
    readonly attack: number,
    readonly defense: number,
  ) {}

  readonly sellPrice = Math.floor(this.buyPrice * 0.7);
}
