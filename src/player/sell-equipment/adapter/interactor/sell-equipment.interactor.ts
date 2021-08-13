import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { SellEquipmentCommand } from '../../domain/command/sell-equipment.command';
import { SellEquipmentErrors } from '../../domain/value-object/sell-equipment.errors';
import { SellEquipmentRepository } from '../interface/sell-equipment.repository';
import { SellEquipmentInteractorRequest } from './sell-equipment.interactor.request';

@Injectable()
export class SellEquipmentInteractor {
  constructor(readonly repository: SellEquipmentRepository) {}

  async invoke(request: SellEquipmentInteractorRequest): Promise<void> {
    const errors = new SellEquipmentErrors();

    const avatarEquipment = await this.repository.getAvatarEquipmentById(
      request.avatarEquipmentId.val,
    );
    const command = SellEquipmentCommand.new(
      request.userId.val,
      avatarEquipment,
      errors,
    );
    if (command === null) throw new ValidationException(errors);

    await this.repository.sellEquipment(command);
  }
}
