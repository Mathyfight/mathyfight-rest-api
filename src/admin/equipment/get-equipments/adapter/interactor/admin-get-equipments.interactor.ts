import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminGetEquipmentsCommand } from '../../domain/command/admin-get-equipments.command';
import { AdminGetEquipmentsErrors } from '../../domain/value-object/admin-get-equipments.errors';
import { AdminGetEquipmentsRepository } from '../interface/admin-get-equipments.repository';
import { AdminGetEquipmentsInteractorRequest } from './admin-get-equipments.interactor.request';
import { AdminGetEquipmentsInteractorResponse } from './admin-get-equipments.interactor.response';

@Injectable()
export class AdminGetEquipmentsInteractor {
  constructor(readonly repository: AdminGetEquipmentsRepository) {}

  async invoke(
    request: AdminGetEquipmentsInteractorRequest,
  ): Promise<AdminGetEquipmentsInteractorResponse[]> {
    const user = await this.repository.getUserById(request.userId.val);
    const equipments = await this.repository.getEquipments(
      request.equipmentType,
    );

    const errors = new AdminGetEquipmentsErrors();
    const cmd = AdminGetEquipmentsCommand.new(user, equipments, errors);
    if (cmd === null) throw new ValidationException(errors);

    return cmd.equipments.map(
      (e) =>
        new AdminGetEquipmentsInteractorResponse(
          e.id,
          e.imageUrl,
          e.name,
          e.description,
          e.sellPrice,
          e.buyPrice,
          e.attack,
          e.defense,
        ),
    );
  }
}
