import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetEquipmentsAppService } from '../application/service/get-equipments.app.service';
import { GetEquipmentsAppServiceRequest } from '../application/service/get-equipments.app.service.request';
import { GetEquipmentsRouteQueries } from './get-equipments.route.queries';
import { GetEquipmentsRouteResponse } from './get-equipments.route.response';

@ApiTags('store')
@Controller('store')
export class GetEquipmentsRoute {
  constructor(readonly getEquipmentsAppService: GetEquipmentsAppService) {}

  @Get('equipments')
  async getEquipmentsRoute(
    @Query() queries: GetEquipmentsRouteQueries,
  ): Promise<GetEquipmentsRouteResponse> {
    const serviceRequest = GetEquipmentsAppServiceRequest.parse(
      queries.type,
      queries.page,
      queries.orderCriteria,
      queries.order,
    );
    const serviceResponse = await this.getEquipmentsAppService.invoke(
      serviceRequest,
    );
    return GetEquipmentsRouteResponse.fromServiceResponse(serviceResponse);
  }
}
