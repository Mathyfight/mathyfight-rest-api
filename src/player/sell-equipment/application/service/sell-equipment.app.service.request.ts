import { BadRequestException } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { SellEquipmentErrors } from '../../domain/value-object/sell-equipment.errors';

export class SellEquipmentAppServiceRequest {
  constructor(readonly avatarEquipmentId: Uuid) {}

  static parse(equipmentId: string): SellEquipmentAppServiceRequest {
    const errors = new SellEquipmentErrors();

    const equipmentIdV = Uuid.parse(
      equipmentId,
      errors,
      DomainErrorsProp.equipmentId,
    );

    if (equipmentIdV === null) throw new BadRequestException(errors);

    return new SellEquipmentAppServiceRequest(equipmentIdV);
  }
}
