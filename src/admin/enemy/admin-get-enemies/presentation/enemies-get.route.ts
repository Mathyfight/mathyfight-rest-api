import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEnemiesInteractor } from '../adapter/interactor/get-enemies.interactor';
import { AdminEnemiesGetRouteResponse } from './enemies-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.enemy')
@Controller()
export class EnemiesGetRoute {
  constructor(readonly interactor: GetEnemiesInteractor) {}

  @Get('admin/enemies')
  @ApiResponse({ status: 200, type: AdminEnemiesGetRouteResponse })
  @ApiResponse({ status: 400 })
  async route(): Promise<AdminEnemiesGetRouteResponse[]> {
    const interactorResponse = await this.interactor.invoke();
    return interactorResponse.map((e) => new AdminEnemiesGetRouteResponse(e));
  }
}
