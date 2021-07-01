import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEquipmentsAppService } from '../application/service/get-equipments.app.service';
import { GetEquipmentsAppServiceRequest } from '../application/service/get-equipments.app.service.request';
import { StoreGetEquipmentsRouteErrors } from './store-get-equipments.route.errors';
import { StoreGetEquipmentsRouteQueries } from './store-get-equipments.route.queries';
import { StoreGetEquipmentsRouteResponse } from './store-get-equipments.route.response';

@ApiBearerAuth()
@ApiTags('store')
@UseGuards(JwtAuthGuard)
@Controller('store')
export class StoreGetEquipmentsRoute {
  constructor(readonly getEquipmentsAppService: GetEquipmentsAppService) {}

  @Get('equipments')
  @ApiResponse({ status: 200, type: StoreGetEquipmentsRouteResponse })
  @ApiResponse({ status: 400, type: StoreGetEquipmentsRouteErrors })
  async getEquipmentsRoute(
    @Request() request: { user: JwtPayload },
    @Query() queries: StoreGetEquipmentsRouteQueries,
  ): Promise<StoreGetEquipmentsRouteResponse> {
    const serviceRequest = GetEquipmentsAppServiceRequest.parse(
      queries.type,
      queries.page,
      request.user.userId,
      queries.orderCriteria,
      queries.order,
    );
    const serviceResponse = await this.getEquipmentsAppService.invoke(
      serviceRequest,
    );
    return StoreGetEquipmentsRouteResponse.fromServiceResponse(serviceResponse);
  }
}
