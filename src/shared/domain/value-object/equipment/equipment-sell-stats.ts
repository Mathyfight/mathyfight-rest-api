export class EquipmentSellStats {
  constructor(
    readonly baseSellPrice: number,
    readonly level: number,
    readonly levelSellRate: number,
  ) {}

  get sellPrice(): number {
    return Math.ceil(
      this.baseSellPrice * (1 + this.levelSellRate) ** (this.level - 1),
    );
  }
}
