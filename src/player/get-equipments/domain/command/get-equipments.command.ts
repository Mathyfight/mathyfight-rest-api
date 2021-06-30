import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { EquipmentSortingOrder } from '../value-object/equipment-sorting-order';

export class GetEquipmentsCommand {
  constructor(
    readonly avatarId: string,
    readonly elementsPerPage: number,
    readonly page: number,
    readonly equipmentType: EquipmentType,
    readonly sortingOrderCriteria?: SortingOrderCriteria,
    readonly equipmentSortingOrder?: EquipmentSortingOrder,
  ) {}
}
