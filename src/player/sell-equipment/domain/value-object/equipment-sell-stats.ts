export class EquipmentSellStats {
  constructor(readonly buyPrice: number) {}

  readonly sellPrice = Math.floor(this.buyPrice * 0.7);
}
