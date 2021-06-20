import { BadRequestException } from '@nestjs/common';
import { EquipmentSortingOrder } from 'src/shared/domain/value-object/equipment/equipment-sorting-order';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';

export class GetEquipmentsAppServiceRequest {
  constructor(
    readonly equipmentType: EquipmentType,
    readonly page: PositiveInteger,
    readonly sortingOrderCriteria?: SortingOrderCriteria,
    readonly equipmentSortingOrder?: EquipmentSortingOrder,
  ) {}

  static parse(
    equipmentType: EquipmentType,
    page: number,
    sortingOrderCriteria?: SortingOrderCriteria,
    equipmentSortingOrder?: EquipmentSortingOrder,
  ): GetEquipmentsAppServiceRequest {
    const errors = new DomainErrors();
    const pageV = PositiveInteger.parse(page, errors, DomainErrorsProp.page);

    if (pageV === null) throw new BadRequestException(errors);

    return new GetEquipmentsAppServiceRequest(
      equipmentType,
      pageV,
      sortingOrderCriteria,
      equipmentSortingOrder,
    );
  }
}
