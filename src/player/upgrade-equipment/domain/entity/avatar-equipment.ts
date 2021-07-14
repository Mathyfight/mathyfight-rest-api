import { Player } from './player';

export class AvatarEquipment {
  constructor(
    readonly id: string,
    readonly level: number,
    readonly player: Player,
  ) {}

  readonly upgradePrice = 10;
  readonly canBuyUpgrade = this.player.gold - this.upgradePrice >= 0;
  readonly reachedMaximumLevel = this.level === 10;
  readonly goldDifferenceForUpgrade = this.upgradePrice - this.player.gold;
}
