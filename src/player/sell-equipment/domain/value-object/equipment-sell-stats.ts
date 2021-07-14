export class EquipmentSellStats {
  constructor(
    readonly baseSellPrice: number,
    readonly level: number,
    readonly levelSellRate: number,
  ) {}

  readonly sellPrice = Math.ceil(
    this.baseSellPrice * (1 + this.levelSellRate) ** (this.level - 1),
  );
}
