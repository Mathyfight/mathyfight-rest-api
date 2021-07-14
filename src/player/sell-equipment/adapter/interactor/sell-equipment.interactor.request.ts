import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { SellEquipmentErrors } from '../../domain/value-object/sell-equipment.errors';

export class SellEquipmentInteractorRequest {
  constructor(readonly userId: Uuid, readonly avatarEquipmentId: Uuid) {}

  static parse(
    userId: string,
    equipmentId: string,
  ): SellEquipmentInteractorRequest {
    const errors = new SellEquipmentErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const equipmentIdV = Uuid.parse(
      equipmentId,
      errors,
      DomainErrorsProp.avatarEquipmentId,
    );

    if (userIdV === null || equipmentIdV === null)
      throw new BadRequestException({ errors: errors });

    return new SellEquipmentInteractorRequest(userIdV, equipmentIdV);
  }
}
