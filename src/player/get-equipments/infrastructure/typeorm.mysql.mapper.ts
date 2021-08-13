import { EquipmentSortingOrder } from '../domain/value-object/equipment-sorting-order';

export class GetEquipmentsTypeOrmMySqlMapper {
  static equipmentSortingOrderToColumn(
    order?: EquipmentSortingOrder,
  ): 'attack' | 'defense' | 'name' | 'buy_price' {
    return order === EquipmentSortingOrder.Attack
      ? 'attack'
      : order === EquipmentSortingOrder.Defense
      ? 'defense'
      : order === EquipmentSortingOrder.Name
      ? 'name'
      : 'buy_price';
  }
}
