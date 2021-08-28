import { Request, Controller, UseGuards, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AbandonBattleInteractor } from '../adapter/interactor/abandon-battle.interactor';
import { AbandonBattleInteractorRequest } from '../adapter/interactor/abandon-battle.interactor.request';
import { BattleAbandonRouteErrors } from './battle-abandon.route.errors';
import { BattleAbandonRouteParams } from './battle-abandon.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class BattleAbandonRoute {
  constructor(readonly interactor: AbandonBattleInteractor) {}

  @Put(':battleId/abandon')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: BattleAbandonRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: BattleAbandonRouteParams,
  ): Promise<void> {
    const interactorRequest = AbandonBattleInteractorRequest.parse(
      request.user.userId,
      params.battleId,
    );
    await this.interactor.invoke(interactorRequest);
  }
}
