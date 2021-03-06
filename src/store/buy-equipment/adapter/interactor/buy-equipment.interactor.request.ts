import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { BuyEquipmentErrors } from '../../domain/value-object/buy-equipment.errors';

export class BuyEquipmentInteractorRequest {
  constructor(readonly userId: Uuid, readonly equipmentId: Uuid) {}

  static parse(
    userId: string,
    equipmentId: string,
  ): BuyEquipmentInteractorRequest {
    const errors = new BuyEquipmentErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const equipmentIdV = Uuid.parse(
      equipmentId,
      errors,
      DomainErrorsProp.equipmentId,
    );

    if (userIdV === null || equipmentIdV === null)
      throw new ValidationException(errors);

    return new BuyEquipmentInteractorRequest(userIdV, equipmentIdV);
  }
}
