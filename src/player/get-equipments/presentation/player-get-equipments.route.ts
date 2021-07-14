import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEquipmentsInteractor } from '../adapter/interactor/get-equipments.interactor';
import { GetEquipmentsInteractorRequest } from '../adapter/interactor/get-equipments.interactor.request';
import { PlayerGetEquipmentsRouteErrors } from './player-get-equipments.route.errors';
import { PlayerGetEquipmentsRouteQueries } from './player-get-equipments.route.queries';
import { PlayerGetEquipmentsRouteResponse } from './player-get-equipments.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerGetEquipmentsRoute {
  constructor(readonly getEquipmentsAppService: GetEquipmentsInteractor) {}

  @Get('equipments')
  @ApiResponse({ status: 200, type: PlayerGetEquipmentsRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetEquipmentsRouteErrors })
  async getEquipmentsRoute(
    @Request() request: { user: JwtPayload },
    @Query() queries: PlayerGetEquipmentsRouteQueries,
  ): Promise<PlayerGetEquipmentsRouteResponse> {
    const serviceRequest = GetEquipmentsInteractorRequest.parse(
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
