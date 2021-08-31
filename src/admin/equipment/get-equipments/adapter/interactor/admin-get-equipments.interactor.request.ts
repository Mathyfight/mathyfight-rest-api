import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminGetEquipmentsErrors } from '../../domain/value-object/admin-get-equipments.errors';

export class AdminGetEquipmentsInteractorRequest {
  constructor(readonly userId: Uuid, readonly equipmentType: EquipmentType) {}

  static parse(
    userId: string,
    equipmentType: EquipmentType,
  ): AdminGetEquipmentsInteractorRequest {
    const errors = new AdminGetEquipmentsErrors();
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (userIdV === null) throw new ValidationException(errors);

    return new AdminGetEquipmentsInteractorRequest(userIdV, equipmentType);
  }
}
