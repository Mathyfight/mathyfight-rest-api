import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { getFileNameFromUrl } from 'src/shared/domain/value-object/util/util';
import { AdminEditEquipmentCommand } from '../../domain/command/admin-edit-equipment.command';
import { AdminEditEquipmentErrors } from '../../domain/value-object/admin-edit-equipment.errors';
import { AdminEditEquipmentRepository } from '../interface/admin-edit-equipment.repository';
import { AdminEditEquipmentInteractorRequest } from './admin-edit-equipment.interactor.request';
import { AdminEditEquipmentInteractorResponse } from './admin-edit-equipment.interactor.response';

@Injectable()
export class AdminEditEquipmentInteractor {
  constructor(
    private readonly repository: AdminEditEquipmentRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    req: AdminEditEquipmentInteractorRequest,
  ): Promise<AdminEditEquipmentInteractorResponse> {
    const user = await this.repository.getUserById(req.userId.val);

    const errors = new AdminEditEquipmentErrors();
    const cmd = AdminEditEquipmentCommand.new(
      user,
      req.equipmentId.val,
      req.image?.val,
      req.name?.val,
      req.description?.val,
      req.buyPrice?.val,
      req.attack?.val,
      req.defense?.val,
      req.isActive,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    if (cmd.uploadEquipmentImage !== undefined) {
      const oldImageUrl = await this.repository.getImageUrlFromEquipment(
        cmd.persistEquipment.id,
      );
      const oldImageName = getFileNameFromUrl(oldImageUrl!);
      await this.storageService.deleteFile(oldImageName);
      await this.storageService.uploadFile(
        cmd.uploadEquipmentImage.imageName,
        cmd.uploadEquipmentImage.image,
      );
    }
    await this.repository.persistEquipment(cmd.persistEquipment);

    return new AdminEditEquipmentInteractorResponse(
      cmd.persistEquipment.imageUrl === undefined
        ? null
        : cmd.persistEquipment.imageUrl,
    );
  }
}
