import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { UpgradeEquipmentErrors } from '../../domain/value-object/upgrade-equipment.errors';

export class UpgradeEquipmentInteractorRequest {
  constructor(readonly userId: Uuid, readonly avatarEquipmentId: Uuid) {}

  static parse(
    userId: string,
    avatarEquipmentId: string,
  ): UpgradeEquipmentInteractorRequest {
    const errors = new UpgradeEquipmentErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const avatarEquipmentIdV = Uuid.parse(
      avatarEquipmentId,
      errors,
      DomainErrorsProp.avatarEquipmentId,
    );

    if (userIdV === null || avatarEquipmentIdV === null)
      throw new BadRequestException({ errors: errors });

    return new UpgradeEquipmentInteractorRequest(userIdV, avatarEquipmentIdV);
  }
}
