import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainErrorsOld } from 'src/shared/domain/value-object/util/domain-errors-old';
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
    const errors = new DomainErrorsOld();
    const domainService = new GetEquipmentsDomainService();

    const avatarId = await this.repository.getAvatarIdByUserId(request.userId);
    domainService.validateExistingAvatar(avatarId, errors);

    if (errors.isNotEmpty || avatarId === null)
      throw new BadRequestException(errors);

    const elementsPerPage = 20;
    const [equipments, totalRows] = await this.repository.getEquipments(
      request.equipmentType,
      elementsPerPage,
      request.page,
      avatarId,
      request.sortingOrderCriteria,
      request.equipmentSortingOrder,
    );

    const lastEquipmentRow =
      (request.page.val - 1) * elementsPerPage + equipments.length;
    const nextPage =
      equipments.length < elementsPerPage
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
