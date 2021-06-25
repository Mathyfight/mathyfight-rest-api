import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { BuyEquipmentErrors } from '../../domain/value-object/buy-equipment.errors';

export class BuyEquipmentAppServiceRequest {
  constructor(readonly userId: Uuid, readonly equipmentId: Uuid) {}

  static parse(
    userId: string,
    equipmentId: string,
  ): BuyEquipmentAppServiceRequest {
    const errors = new BuyEquipmentErrors();
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
