export class EquipmentStats {
  constructor(
    readonly attack: number,
    readonly defense: number,
    readonly buyPrice: number,
  ) {}

  readonly sellPrice = Math.floor(this.buyPrice * 0.7);
}
