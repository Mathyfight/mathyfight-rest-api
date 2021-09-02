import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEnemiesInteractor } from '../adapter/interactor/get-enemies.interactor';
import { GetEnemiesInteractorRequest } from '../adapter/interactor/get-enemies.interactor.request';
import { EnemiesGetRouteQueries } from './enemies-get.route.queries';
import { AdminEnemiesGetRouteResponse } from './enemies-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.enemy')
@Controller()
export class EnemiesGetRoute {
  constructor(readonly interactor: GetEnemiesInteractor) {}

  @Get('admin/enemies')
  @ApiResponse({ status: 200, type: [AdminEnemiesGetRouteResponse] })
  @ApiResponse({ status: 400 })
  async route(
    @Query() queries: EnemiesGetRouteQueries,
  ): Promise<AdminEnemiesGetRouteResponse[]> {
    const intReq = new GetEnemiesInteractorRequest(
      queries.available === undefined
        ? undefined
        : queries.available === 'true',
    );
    const interactorResponse = await this.interactor.invoke(intReq);
    return interactorResponse.map((e) => new AdminEnemiesGetRouteResponse(e));
  }
}
