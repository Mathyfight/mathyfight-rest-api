import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { User } from '../entity/user';
import { EquipmentSortingOrder } from '../value-object/equipment-sorting-order';
import { GetEquipmentsErrors } from '../value-object/get-equipments.errors';

export class GetEquipmentsCommand {
  static userDoesNotExist = 'debe existir';
  static avatarDoesNotExist = 'el usuario debe tener un avatar';

  private constructor(
    readonly avatarId: string,
    readonly elementsPerPage: number,
    readonly page: number,
    readonly equipmentType: EquipmentType,
    readonly sortingOrderCriteria?: SortingOrderCriteria,
    readonly equipmentSortingOrder?: EquipmentSortingOrder,
  ) {}

  static new(
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
