import { BadRequestException, Injectable } from '@nestjs/common';
import { GetEquipmentsErrors } from '../../domain/value-object/get-equipments.errors';
import { GetEquipmentsAppServiceRequest } from './get-equipments.app.service.request';
import { GetEquipmentsAppServiceResponse } from './get-equipments.app.service.response';
import { GetEquipmentsDomainService } from '../../domain/service/get-equipments.domain.service';
import { GetEquipmentsRepository } from '../adapter/get-equipments.repository';

@Injectable()
export class GetEquipmentsAppService {
  constructor(readonly repository: GetEquipmentsRepository) {}

  async invoke(
    request: GetEquipmentsAppServiceRequest,
  ): Promise<GetEquipmentsAppServiceResponse> {
    const errors = new GetEquipmentsErrors();
    const domainService = new GetEquipmentsDomainService();

    const user = await this.repository.getUserById(request.userId.val);

    const command = domainService.invoke(
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
    return new GetEquipmentsAppServiceResponse(
      command.page,
      command.elementsPerPage,
      totalRows,
      equipments,
    );
  }
}
