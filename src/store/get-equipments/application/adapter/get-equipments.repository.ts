import { EquipmentSortingOrder } from 'src/store/get-equipments/domain/value-object/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { Equipment } from '../../domain/entity/equipment';

export abstract class GetEquipmentsRepository {
  abstract getEquipments(
    equipmentType: EquipmentType,
    elementsPerPage: number,
    page: PositiveInteger,
    avatarId: string,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): Promise<[Equipment[], number]>;
  abstract getAvatarIdByUserId(userId: string): Promise<string | null>;
}
