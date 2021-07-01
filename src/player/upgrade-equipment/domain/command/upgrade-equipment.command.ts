import { RemovePlayerGold } from './remove-player-gold';
import { UpgradeEquipmentLevel } from './upgrade-equipment-level';

export class UpgradeEquipmentCommand {
  constructor(
    readonly upgradeEquipmentLevel: UpgradeEquipmentLevel,
    readonly removePlayerGold: RemovePlayerGold,
  ) {}
}
