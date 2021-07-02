import { BadRequestException, Injectable } from '@nestjs/common';
import { BuyEquipmentDomainService } from '../../domain/service/buy-equipment.domain.service';
import { BuyEquipmentErrors } from '../../domain/value-object/buy-equipment.errors';
import { BuyEquipmentRepository } from '../adapter/buy-equipment.repository';
import { BuyEquipmentAppServiceRequest } from './buy-equipment.app.service.request';

@Injectable()
export class BuyEquipmentAppService {
  constructor(readonly repository: BuyEquipmentRepository) {}

  async invoke(request: BuyEquipmentAppServiceRequest): Promise<void> {
    const errors = new BuyEquipmentErrors();
    const domainService = new BuyEquipmentDomainService();

    const foundUser = await this.repository.getUserById(request.userId);
    const foundEquipment = await this.repository.getEquipmentById(
      request.equipmentId,
    );

    const command = domainService.invoke(foundUser, foundEquipment, errors);
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.decreasePlayerGold(command.decreasePlayerGold);
    await this.repository.addEquipmentToAvatarInventory(
      command.addEquipmentToAvatar,
    );
  }
}
