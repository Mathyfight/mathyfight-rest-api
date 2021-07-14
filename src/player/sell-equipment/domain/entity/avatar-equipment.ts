import { EquipmentSellStats } from '../value-object/equipment-sell-stats';

export class AvatarEquipment {
  constructor(
    readonly id: string,
    readonly playerId: string,
    readonly userId: string,
    readonly sellStats: EquipmentSellStats,
  ) {}
}
