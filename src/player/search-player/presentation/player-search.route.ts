import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { SearchPlayerInteractor } from '../adapter/interactor/search-player.interactor';
import { SearchPlayerInteractorRequest } from '../adapter/interactor/search-player.interactor.request';
import { PlayerSearchRouteQuery } from './player-search.route.query';
import { PlayerSearchRouteResponse } from './player-search.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('players')
export class PlayerSearchRoute {
  constructor(readonly interactor: SearchPlayerInteractor) {}

  @Get()
  @ApiResponse({ status: 200, type: [PlayerSearchRouteResponse] })
  async route(
    @Query() query: PlayerSearchRouteQuery,
  ): Promise<PlayerSearchRouteResponse[]> {
    const intReq = new SearchPlayerInteractorRequest(query.username);
    const intRes = await this.interactor.invoke(intReq);
    return intRes.map((res) => new PlayerSearchRouteResponse(res));
  }
}
