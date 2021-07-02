import { BadRequestException, Injectable } from '@nestjs/common';
import { UpgradeEquipmentDomainService } from '../../domain/service/upgrade-equipment.domain.service';
import { UpgradeEquipmentErrors } from '../../domain/value-object/upgrade-equipment.errors';
import { UpgradeEquipmentRepository } from '../adapter/upgrade-equipment.repository';
import { UpgradeEquipmentAppServiceRequest } from './upgrade-equipment.app.service.request';

@Injectable()
export class UpgradeEquipmentAppService {
  constructor(readonly repository: UpgradeEquipmentRepository) {}

  async invoke(request: UpgradeEquipmentAppServiceRequest): Promise<void> {
    const errors = new UpgradeEquipmentErrors();
    const domainService = new UpgradeEquipmentDomainService();

    const avatarEquipment = await this.repository.getAvatarEquipmentById(
      request.avatarEquipmentId.val,
    );
    const command = domainService.invoke(avatarEquipment, errors);
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.upgradeEquipmentLevel(command.upgradeEquipmentLevel);
    await this.repository.removePlayerGold(command.removePlayerGold);
  }
}
