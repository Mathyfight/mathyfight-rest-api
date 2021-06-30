import { EquipmentSortingOrder } from '../domain/value-object/equipment-sorting-order';

export class GetEquipmentsTypeOrmMySqlMapper {
  static equipmentSortingOrderToColumn(
    order?: EquipmentSortingOrder,
  ): 'baseAttack' | 'baseDefense' | 'name' | 'buyPrice' {
    return order === EquipmentSortingOrder.Attack
      ? 'baseAttack'
      : order === EquipmentSortingOrder.Defense
      ? 'baseDefense'
      : order === EquipmentSortingOrder.Name
      ? 'name'
      : 'buyPrice';
  }
}
