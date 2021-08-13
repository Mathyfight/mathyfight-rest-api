import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { EquipmentSortingOrder } from 'src/store/get-equipments/domain/value-object/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { GetEquipmentsErrors } from '../../domain/value-object/get-equipments.errors';

export class GetEquipmentsInteractorRequest {
  constructor(
    readonly equipmentType: EquipmentType,
    readonly page: PositiveInteger,
    readonly userId: Uuid,
    readonly sortingOrderCriteria?: SortingOrderCriteria,
    readonly equipmentSortingOrder?: EquipmentSortingOrder,
  ) {}

  static parse(
    equipmentType: EquipmentType,
    page: number,
    userId: string,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): GetEquipmentsInteractorRequest {
    const errors = new GetEquipmentsErrors();
    const pageV = PositiveInteger.parse(page, errors, DomainErrorsProp.page);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (pageV === null || userIdV === null)
      throw new ValidationException(errors);

    return new GetEquipmentsInteractorRequest(
      equipmentType,
      pageV,
      userIdV,
      sortingOrderCriteria,
      equipmentSortingOrder,
    );
  }
}
