import { Request, Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetBattleInteractor } from '../adapter/interactor/get-battle.interactor';
import { GetBattleInteractorRequest } from '../adapter/interactor/get-battle.interactor.request';
import { BattleGetRouteErrors } from './battle-get.route.errors';
import { BattleGetRouteParams } from './battle-get.route.params';
import { BattleGetRouteResponse } from './battle-get.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class BattleGetRoute {
  constructor(readonly interactor: GetBattleInteractor) {}

  @Get(':battleId')
  @ApiResponse({ status: 200, type: BattleGetRouteResponse })
  @ApiResponse({ status: 400, type: BattleGetRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: BattleGetRouteParams,
  ): Promise<BattleGetRouteResponse> {
    const interactorRequest = GetBattleInteractorRequest.parse(
      params.battleId,
      request.user.userId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new BattleGetRouteResponse(interactorResponse);
  }
}
