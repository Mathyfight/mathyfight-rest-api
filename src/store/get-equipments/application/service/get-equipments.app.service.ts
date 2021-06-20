import { BadRequestException, Injectable } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { GetEquipmentsDomainService } from '../../domain/service/get-equipments.domain.service';
import { GetEquipmentsRepository } from '../adapter/get-equipments.repository';
import { GetEquipmentsAppServiceRequest } from './get-equipments.app.service.request';
import {
  GetEquipmentsAppServiceResponse,
  GetEquipmentsEquipmentAppServiceResponse,
} from './get-equipments.app.service.response';

@Injectable()
export class GetEquipmentsAppService {
  constructor(readonly repository: GetEquipmentsRepository) {}

  async invoke(
    request: GetEquipmentsAppServiceRequest,
  ): Promise<GetEquipmentsAppServiceResponse> {
    const errors = new DomainErrors();
    const domainService = new GetEquipmentsDomainService();

    const avatarId = await this.repository.getAvatarIdByUserId(request.userId);
    domainService.validateExistingAvatar(avatarId, errors);

    if (errors.isNotEmpty || avatarId === null)
      throw new BadRequestException(errors);

    const [equipments, totalRows] = await this.repository.getEquipments(
      request.equipmentType,
      request.page,
      avatarId,
      request.sortingOrderCriteria,
      request.equipmentSortingOrder,
    );

    const rowsPerPage = 10;
    const lastEquipmentRow =
      (request.page.val - 1) * rowsPerPage + equipments.length;
    const nextPage =
      equipments.length < rowsPerPage
        ? null
        : lastEquipmentRow === totalRows
        ? null
        : request.page.val + 1;

    return new GetEquipmentsAppServiceResponse(
      nextPage,
      equipments.map(
        (e) =>
          new GetEquipmentsEquipmentAppServiceResponse(
            e.id,
            e.name,
            e.attack,
            e.defense,
            e.imageUrl,
            e.description,
            e.buyPrice,
          ),
      ),
    );
  }
}
