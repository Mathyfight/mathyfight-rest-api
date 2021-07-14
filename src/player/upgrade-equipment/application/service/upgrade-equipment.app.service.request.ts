import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { UpgradeEquipmentErrors } from '../../domain/value-object/upgrade-equipment.errors';

export class UpgradeEquipmentAppServiceRequest {
  constructor(readonly avatarEquipmentId: Uuid) {}

  static parse(avatarEquipmentId: string): UpgradeEquipmentAppServiceRequest {
    const errors = new UpgradeEquipmentErrors();
    const avatarEquipmentIdV = Uuid.parse(
      avatarEquipmentId,
      errors,
      DomainErrorsProp.avatarEquipmentId,
    );
    if (avatarEquipmentIdV === null)
      throw new BadRequestException({ errors: errors });
    return new UpgradeEquipmentAppServiceRequest(avatarEquipmentIdV);
  }
}
