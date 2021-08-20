import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetPlayerStatisticsInteractor } from '../adapter/interactor/get-player-statistics.interactor';
import { GetPlayerStatisticsInteractorRequest } from '../adapter/interactor/get-player-statistics.interactor.request';
import { PlayerGetStatisticsRouteErrors } from './player-get-statistics.route.errors';
import { PlayerGetStatisticsRouteParams } from './player-get-statistics.route.params';
import { PlayerGetStatisticsRouteResponse } from './player-get-statistics.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('users')
export class PlayerGetStatisticsRoute {
  constructor(readonly interactor: GetPlayerStatisticsInteractor) {}

  @Get(':userId/player/statistics')
  @ApiResponse({ status: 200, type: PlayerGetStatisticsRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetStatisticsRouteErrors })
  async route(
    @Param() params: PlayerGetStatisticsRouteParams,
  ): Promise<PlayerGetStatisticsRouteResponse> {
    const intRequest = GetPlayerStatisticsInteractorRequest.parse(
      params.userId,
    );
    const intRes = await this.interactor.invoke(intRequest);
    return new PlayerGetStatisticsRouteResponse(intRes);
  }
}
