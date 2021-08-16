import { EquipmentSortingOrder } from '../domain/value-object/equipment-sorting-order';

export class GetEquipmentsTypeOrmMySqlMapper {
  static equipmentSortingOrderToColumn = (
    order?: EquipmentSortingOrder,
  ): 'attack' | 'defense' | 'name' | 'buyPrice' =>
    order === EquipmentSortingOrder.Attack
      ? 'attack'
      : order === EquipmentSortingOrder.Defense
      ? 'defense'
      : order === EquipmentSortingOrder.Name
      ? 'name'
      : 'buyPrice';
}
