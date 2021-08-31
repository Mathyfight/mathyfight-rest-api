import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminAddEquipmentCommand } from '../../domain/command/admin-add-equipment.command';
import { AdminAddEquipmentErrors } from '../../domain/value-object/admin-add-equipment.errors';
import { AdminAddEquipmentRepository } from '../interface/admin-add-equipment.repository';
import { AdminAddEquipmentInteractorRequest } from './admin-add-equipment.interactor.request';
import { AdminAddEquipmentInteractorResponse } from './admin-add-equipment.interactor.response';

@Injectable()
export class AdminAddEquipmentInteractor {
  constructor(
    private readonly repository: AdminAddEquipmentRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    req: AdminAddEquipmentInteractorRequest,
  ): Promise<AdminAddEquipmentInteractorResponse> {
    const user = await this.repository.getUserById(req.userId.val);

    const errors = new AdminAddEquipmentErrors();
    const cmd = AdminAddEquipmentCommand.new(
      user,
      req.image.val,
      req.name.val,
      req.description.val,
      req.buyPrice.val,
      req.attack.val,
      req.defense.val,
      req.equipmentType,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    await this.storageService.uploadFile(
      cmd.uploadEquipmentImage.imageName,
      cmd.uploadEquipmentImage.image,
    );
    await this.repository.persistEquipment(cmd.persistEquipment);

    return new AdminAddEquipmentInteractorResponse(
      cmd.persistEquipment.id,
      cmd.persistEquipment.imageUrl,
    );
  }
}
