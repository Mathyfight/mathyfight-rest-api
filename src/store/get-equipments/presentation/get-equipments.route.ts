import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEquipmentsAppService } from '../application/service/get-equipments.app.service';
import { GetEquipmentsAppServiceRequest } from '../application/service/get-equipments.app.service.request';
import { GetEquipmentsRouteQueries } from './get-equipments.route.queries';
import { GetEquipmentsRouteResponse } from './get-equipments.route.response';

@ApiBearerAuth()
@ApiTags('store')
@UseGuards(JwtAuthGuard)
@Controller('store')
export class GetEquipmentsRoute {
  constructor(readonly getEquipmentsAppService: GetEquipmentsAppService) {}

  @Get('equipments')
  @ApiResponse({ type: GetEquipmentsRouteResponse })
  async getEquipmentsRoute(
    @Request() request: { user: JwtPayload },
    @Query() queries: GetEquipmentsRouteQueries,
  ): Promise<GetEquipmentsRouteResponse> {
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
    return GetEquipmentsRouteResponse.fromServiceResponse(serviceResponse);
  }
}
