import { EquipmentSellStats } from 'src/shared/domain/value-object/equipment/equipment-sell-stats';

export class AvatarEquipment {
  constructor(
    readonly id: string,
    readonly playerId: string,
    readonly sellStats: EquipmentSellStats,
  ) {}
}
