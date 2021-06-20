import { Injectable } from '@nestjs/common';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
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
    const [equipments, totalRows] = await this.repository.getEquipments(
      request.equipmentType,
      request.page,
      Uuid.fromExisting('ds'),
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
