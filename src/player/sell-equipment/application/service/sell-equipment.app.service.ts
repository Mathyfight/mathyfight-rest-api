import { BadRequestException, Injectable } from '@nestjs/common';
import { SellEquipmentDomainService } from '../../domain/service/sell-equipment.domain.service';
import { SellEquipmentErrors } from '../../domain/value-object/sell-equipment.errors';
import { SellEquipmentRepository } from '../adapter/sell-equipment.repository';
import { SellEquipmentAppServiceRequest } from './sell-equipment.app.service.request';

@Injectable()
export class SellEquipmentAppService {
  constructor(readonly repository: SellEquipmentRepository) {}

  async invoke(request: SellEquipmentAppServiceRequest): Promise<void> {
    const errors = new SellEquipmentErrors();
    const domainService = new SellEquipmentDomainService();

    const avatarEquipment = await this.repository.getAvatarEquipmentById(
      request.avatarEquipmentId.val,
    );
    const command = domainService.invoke(avatarEquipment, errors);
    if (command === null) throw new BadRequestException(errors);

    await this.repository.removeAvatarEquipment(command.removeAvatarEquipment);
    await this.repository.givePlayerGold(command.givePlayerGold);
  }
}
