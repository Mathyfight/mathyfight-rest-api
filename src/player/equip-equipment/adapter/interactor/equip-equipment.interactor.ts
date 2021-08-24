import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { EquipEquipmentCommand } from '../../domain/command/equip-equipment.command';
import { EquipEquipmentErrors } from '../../domain/value-object/equip-equipment.errors';
import { EquipEquipmentRepository } from '../interface/equip-equipment.repository';
import { EquipEquipmentInteractorRequest } from './equip-equipment.interactor.request';

@Injectable()
export class EquipEquipmentInteractor {
  constructor(private readonly repository: EquipEquipmentRepository) {}

  async invoke(request: EquipEquipmentInteractorRequest): Promise<void> {
    const user = await this.repository.getUserById(request.userId.val);
    const equipment =
      request.equipmentId === undefined
        ? undefined
        : await this.repository.getAvatarEquipmentById(request.equipmentId.val);

    const errors = new EquipEquipmentErrors();
    const cmd = EquipEquipmentCommand.new(
      user,
      equipment,
      request.equipmentType,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    await this.repository.equipOrRemoveEquipment(cmd);
  }
}
