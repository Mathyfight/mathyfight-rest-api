import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { EquipEquipmentErrors } from '../../domain/value-object/equip-equipment.errors';

export class EquipEquipmentInteractorRequest {
  constructor(
    readonly equipmentId: Uuid | undefined,
    readonly equipmentType: EquipmentType,
    readonly userId: Uuid,
  ) {}

  static parse(
    equipmentId: string | null,
    userId: string,
    equipmentType: EquipmentType,
  ): EquipEquipmentInteractorRequest {
    const errors = new EquipEquipmentErrors();
    const equipmentIdV =
      equipmentId === null
        ? undefined
        : Uuid.parse(equipmentId, errors, DomainErrorsProp.equipmentId);
    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);

    if (equipmentIdV === null || userIdV === null)
      throw new ValidationException(errors);

    return new EquipEquipmentInteractorRequest(
      equipmentIdV,
      equipmentType,
      userIdV,
    );
  }
}
