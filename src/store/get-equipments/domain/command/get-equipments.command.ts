import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { Equipment } from '../entity/equipment';
import { EquipmentSortingOrder } from '../value-object/equipment-sorting-order';
import { GetEquipmentsErrors } from '../value-object/get-equipments.errors';

export class GetEquipmentsCommand {
  static userHasToHaveAnAvatar = 'debe tener un avatar';

  readonly elementsPerPage = 20;

  private constructor(
    readonly avatarId: string,
    readonly equipmentType: EquipmentType,
    readonly page: number,
    readonly sortingOrderCriteria?: SortingOrderCriteria,
    readonly equipmentSortingOrder?: EquipmentSortingOrder,
  ) {}

  static new(
    avatarId: string | null,
    equipmentType: EquipmentType,
    page: number,
    errors: GetEquipmentsErrors,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): GetEquipmentsCommand | null {
    if (avatarId === null) {
      errors.userId.push(this.userHasToHaveAnAvatar);
      return null;
    }
    return new GetEquipmentsCommand(
      avatarId,
      equipmentType,
      page,
      sortingOrderCriteria,
      equipmentSortingOrder,
    );
  }

  nextPage(equipments: Equipment[], totalRows: number): number | null {
    const lastEquipmentRow =
      (this.page - 1) * this.elementsPerPage + equipments.length;
    return equipments.length < this.elementsPerPage
      ? null
      : lastEquipmentRow === totalRows
      ? null
      : this.page + 1;
  }
}
