import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEquipmentsAppService } from '../application/service/get-equipments.app.service';
import { GetEquipmentsAppServiceRequest } from '../application/service/get-equipments.app.service.request';
import { PlayerGetEquipmentsRouteErrors } from './player-get-equipments.route.errors';
import { PlayerGetEquipmentsRouteQueries } from './player-get-equipments.route.queries';
import { PlayerGetEquipmentsRouteResponse } from './player-get-equipments.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerGetEquipmentsRoute {
  constructor(readonly getEquipmentsAppService: GetEquipmentsAppService) {}

  @Get('equipments')
  @ApiResponse({ status: 200, type: PlayerGetEquipmentsRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetEquipmentsRouteErrors })
  async getEquipmentsRoute(
    @Request() request: { user: JwtPayload },
    @Query() queries: PlayerGetEquipmentsRouteQueries,
  ): Promise<PlayerGetEquipmentsRouteResponse> {
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
    return PlayerGetEquipmentsRouteResponse.fromServiceResponse(
      serviceResponse,
    );
  }
}
