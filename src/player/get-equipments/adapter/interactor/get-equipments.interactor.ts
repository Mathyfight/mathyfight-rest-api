import { BadRequestException, Injectable } from '@nestjs/common';
import { GetEquipmentsErrors } from '../../domain/value-object/get-equipments.errors';
import { GetEquipmentsInteractorRequest } from './get-equipments.interactor.request';
import { GetEquipmentsInteractorResponse } from './get-equipments.interactor.response';
import { GetEquipmentsRepository } from '../interface/get-equipments.repository';
import { GetEquipmentsCommand } from '../../domain/command/get-equipments.command';

@Injectable()
export class GetEquipmentsInteractor {
  constructor(readonly repository: GetEquipmentsRepository) {}

  async invoke(
    request: GetEquipmentsInteractorRequest,
  ): Promise<GetEquipmentsInteractorResponse> {
    const errors = new GetEquipmentsErrors();

    const user = await this.repository.getUserById(request.userId.val);

    const command = GetEquipmentsCommand.new(
      user,
      20,
      request.page.val,
      request.equipmentType,
      errors,
      request.sortingOrderCriteria,
      request.equipmentSortingOrder,
    );
    if (command === null) throw new BadRequestException({ errors: errors });

    const [equipments, totalRows] = await this.repository.getEquipments(
      command,
    );
    return new GetEquipmentsInteractorResponse(
      command.page,
      command.elementsPerPage,
      totalRows,
      equipments,
    );
  }
}
