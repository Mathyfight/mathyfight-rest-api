import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsOld } from 'src/shared/domain/value-object/util/domain-errors-old';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';

export class BuyEquipmentAppServiceRequest {
  constructor(readonly userId: Uuid, readonly equipmentId: Uuid) {}

  static parse(
    userId: string,
    equipmentId: string,
  ): BuyEquipmentAppServiceRequest {
    const errors = new DomainErrorsOld();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const equipmentIdV = Uuid.parse(
      equipmentId,
      errors,
      DomainErrorsProp.equipmentId,
    );

    if (userIdV === null || equipmentIdV === null)
      throw new BadRequestException(errors);

    return new BuyEquipmentAppServiceRequest(userIdV, equipmentIdV);
  }
}
