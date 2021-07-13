import { BadRequestException, Injectable } from '@nestjs/common';
import { BuyEquipmentCommand } from '../../domain/command/buy-equipment.command';
import { BuyEquipmentErrors } from '../../domain/value-object/buy-equipment.errors';
import { BuyEquipmentRepository } from '../interface/buy-equipment.repository';
import { BuyEquipmentInteractorRequest } from './buy-equipment.interactor.request';

@Injectable()
export class BuyEquipmentInteractor {
  constructor(readonly repository: BuyEquipmentRepository) {}

  async invoke(request: BuyEquipmentInteractorRequest): Promise<void> {
    const errors = new BuyEquipmentErrors();

    const foundUser = await this.repository.getUserById(request.userId);
    const foundEquipment = await this.repository.getEquipmentById(
      request.equipmentId,
    );

    const command = BuyEquipmentCommand.new(foundUser, foundEquipment, errors);
    if (command === null) throw new BadRequestException({ errors: errors });

    await this.repository.buyEquipment(command);
  }
}
