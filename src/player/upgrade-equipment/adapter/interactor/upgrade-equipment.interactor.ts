import { BadRequestException, Injectable } from '@nestjs/common';
import { UpgradeEquipmentCommand } from '../../domain/command/upgrade-equipment.command';
import { UpgradeEquipmentErrors } from '../../domain/value-object/upgrade-equipment.errors';
import { UpgradeEquipmentRepository } from '../interface/upgrade-equipment.repository';
import { UpgradeEquipmentInteractorRequest } from './upgrade-equipment.interactor.request';

@Injectable()
export class UpgradeEquipmentInteractor {
  constructor(readonly repository: UpgradeEquipmentRepository) {}

  async invoke(request: UpgradeEquipmentInteractorRequest): Promise<void> {
    const errors = new UpgradeEquipmentErrors();

    const avatarEquipment = await this.repository.getAvatarEquipmentById(
      request.avatarEquipmentId.val,
    );
    const command = UpgradeEquipmentCommand.new(
      request.userId.val,
      avatarEquipment,
      errors,
    );
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.upgradeEquipment(command);
  }
}
