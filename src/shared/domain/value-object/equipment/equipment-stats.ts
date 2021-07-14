export class EquipmentStats {
  constructor(
    readonly baseAttack: number,
    readonly baseDefense: number,
    readonly baseSellPrice: number,
    readonly level: number,
    readonly levelAttackRate: number,
    readonly levelDefenseRate: number,
    readonly levelSellRate: number,
  ) {}

  readonly calculateAttack = (level: number): number =>
    Math.ceil(this.baseAttack * (1 + this.levelAttackRate) ** (level - 1));
  readonly attack: number = this.calculateAttack(this.level);
  readonly improvedAttack: number = this.calculateAttack(this.level + 1);

  readonly calculateDefense = (level: number): number =>
    Math.ceil(this.baseDefense * (1 + this.levelDefenseRate) ** (level - 1));
  readonly defense: number = this.calculateDefense(this.level);
  readonly improvedDefense: number = this.calculateDefense(this.level + 1);

  readonly calculateSellPrice = (level: number): number =>
    Math.ceil(this.baseSellPrice * (1 + this.levelSellRate) ** (level - 1));
  readonly sellPrice: number = this.calculateSellPrice(this.level);

  readonly canUpgrade = this.level < 10;
  readonly upgradePrice = 10;
}
