import { EquipmentSortingOrder } from 'src/shared/domain/value-object/equipment/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { Equipment } from '../../domain/entity/equipment';

export abstract class GetEquipmentsRepository {
  abstract getEquipments(
    equipmentType: EquipmentType,
    page: PositiveInteger,
    avatarId: Uuid,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): Promise<[Equipment[], number]>;
}
