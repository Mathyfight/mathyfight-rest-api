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

  get attack(): number {
    return this.calculateAttack(this.level);
  }

  get improvedAttack(): number {
    return this.calculateAttack(this.level + 1);
  }

  calculateAttack(level: number): number {
    return Math.ceil(
      this.baseAttack * (1 + this.levelAttackRate) ** (level - 1),
    );
  }

  get defense(): number {
    return this.calculateDefense(this.level);
  }

  get improvedDefense(): number {
    return this.calculateDefense(this.level + 1);
  }

  calculateDefense(level: number): number {
    return Math.ceil(
      this.baseDefense * (1 + this.levelDefenseRate) ** (level - 1),
    );
  }

  get sellPrice(): number {
    return this.calculateSellPrice(this.level);
  }

  calculateSellPrice(level: number): number {
    return Math.ceil(
      this.baseSellPrice * (1 + this.levelSellRate) ** (level - 1),
    );
  }

  get canUpgrade(): boolean {
    return this.level < 10;
  }

  get upgradePrice(): number {
    return 10;
  }
}
