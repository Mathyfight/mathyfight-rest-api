import { Player } from './player';

export class AvatarEquipment {
  constructor(readonly id: string, readonly player: Player) {}

  get upgradePrice(): number {
    return 10;
  }

  get canUpgrade(): boolean {
    return this.player.gold - this.upgradePrice >= 0;
  }

  get goldDifferenceForUpgrade(): number {
    return this.upgradePrice - this.player.gold;
  }
}
