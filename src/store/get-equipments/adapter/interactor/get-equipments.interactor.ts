import { BadRequestException, Injectable } from '@nestjs/common';
import { GetEquipmentsCommand } from '../../domain/command/get-equipments.command';
import { GetEquipmentsErrors } from '../../domain/value-object/get-equipments.errors';
import { GetEquipmentsRepository } from '../interface/get-equipments.repository';
import { GetEquipmentsInteractorRequest } from './get-equipments.interactor.request';
import {
  GetEquipmentsInteractorResponse,
  GetEquipmentsEquipmentInteractorResponse,
} from './get-equipments.interactor.response';

@Injectable()
export class GetEquipmentsInteractor {
  constructor(readonly repository: GetEquipmentsRepository) {}

  async invoke(
    request: GetEquipmentsInteractorRequest,
  ): Promise<GetEquipmentsInteractorResponse> {
    const errors = new GetEquipmentsErrors();

    const avatarId = await this.repository.getAvatarIdByUserId(
      request.userId.val,
    );

    const command = GetEquipmentsCommand.new(
      avatarId,
      request.equipmentType,
      request.page.val,
      errors,
      request.sortingOrderCriteria,
      request.equipmentSortingOrder,
    );
    if (command === null) throw new BadRequestException({ errors: errors });

    const [equipments, totalRows] = await this.repository.getEquipments(
      command,
    );

    return new GetEquipmentsInteractorResponse(
      command.nextPage(equipments, totalRows),
      equipments.map(
        (e) =>
          new GetEquipmentsEquipmentInteractorResponse(
            e.id,
            e.name,
            e.attack,
            e.defense,
            e.imageUrl,
            e.description,
            e.buyPrice,
            e.level,
          ),
      ),
    );
  }
}
