import { EquipmentStats } from 'src/shared/domain/value-object/equipment/equipment-stats';

export class Equipment {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly equipmentStats: EquipmentStats,
  ) {}
}
