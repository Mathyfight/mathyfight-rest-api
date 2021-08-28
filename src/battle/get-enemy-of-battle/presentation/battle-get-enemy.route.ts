import { Request, Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetEnemyOfBattleInteractor } from '../adapter/interactor/get-enemy-of-battle.interactor';
import { GetEnemyOfBattleInteractorRequest } from '../adapter/interactor/get-enemy-of-battle.interactor.request';
import { BattleGetEnemyRouteErrors } from './battle-get-enemy.route.errors';
import { BattleGetEnemyRouteParams } from './battle-get-enemy.route.params';
import { BattleGetEnemyRouteResponse } from './battle-get-enemy.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class BattleGetEnemyRoute {
  constructor(readonly interactor: GetEnemyOfBattleInteractor) {}

  @Get(':battleId/enemy')
  @ApiResponse({ status: 200, type: BattleGetEnemyRouteResponse })
  @ApiResponse({ status: 400, type: BattleGetEnemyRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: BattleGetEnemyRouteParams,
  ): Promise<BattleGetEnemyRouteResponse> {
    const interactorRequest = GetEnemyOfBattleInteractorRequest.parse(
      params.battleId,
      request.user.userId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new BattleGetEnemyRouteResponse(interactorResponse);
  }
}
