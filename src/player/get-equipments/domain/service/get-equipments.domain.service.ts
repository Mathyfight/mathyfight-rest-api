import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { User } from '../entity/user';
import { GetEquipmentsErrors } from '../value-object/get-equipments.errors';
import { GetEquipmentsCommand } from '../command/get-equipments.command';
import { EquipmentSortingOrder } from '../value-object/equipment-sorting-order';

export class GetEquipmentsDomainService {
  userDoesNotExist = 'debe existir';
  avatarDoesNotExist = 'el usuario debe tener un avatar';

  invoke(
    user: User | null,
    elementsPerPage: number,
    page: number,
    equipmentType: EquipmentType,
    errors: GetEquipmentsErrors,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): GetEquipmentsCommand | null {
    if (user === null) {
      errors.userId.push(this.userDoesNotExist);
      return null;
    }

    if (user.avatar === null) {
      errors.userId.push(this.avatarDoesNotExist);
      return null;
    }

    return new GetEquipmentsCommand(
      user.avatar.id,
      elementsPerPage,
      page,
      equipmentType,
      sortingOrderCriteria,
      equipmentSortingOrder,
    );
  }
}
