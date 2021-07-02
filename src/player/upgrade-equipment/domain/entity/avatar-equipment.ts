import { Player } from './player';

export class AvatarEquipment {
  constructor(
    readonly id: string,
    readonly level: number,
    readonly player: Player,
  ) {}

  get upgradePrice(): number {
    return 10;
  }

  get canBuyUpgrade(): boolean {
    return this.player.gold - this.upgradePrice >= 0;
  }

  get reachedMaximumLevel(): boolean {
    return this.level === 10;
  }

  get goldDifferenceForUpgrade(): number {
    return this.upgradePrice - this.player.gold;
  }
}
