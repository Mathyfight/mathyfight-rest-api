import { Equipment } from './equipment';

export class BattleAvatar {
  constructor(
    readonly id: string,
    readonly playerId: string,
    readonly currentDefense: number,
    readonly currentHealth: number,
    public level: number,
    public currentExperience: number,
    public baseAttack: number,
    public baseDefense: number,
    public maxHealth: number,
    readonly equipments: Equipment[],
  ) {}

  get attack(): number {
    return this.equipments.reduce(
      (acc, curr) => acc + curr.attack,
      this.baseAttack,
    );
  }
  get maxExperience(): number {
    return this.level * 100;
  }
}
