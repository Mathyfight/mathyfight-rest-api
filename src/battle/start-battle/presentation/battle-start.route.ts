import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { StartBattleInteractor } from '../adapter/interactor/start-battle.interactor';
import { StartBattleInteractorRequest } from '../adapter/interactor/start-battle.interactor.request';
import { BattleStartRouteBody } from './battle-start.route.body';
import { BattleStartRouteErrors } from './battle-start.route.errors';
import { BattleStartRouteResponse } from './battle-start.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class BattleStartRoute {
  constructor(readonly interactor: StartBattleInteractor) {}

  @Post()
  @ApiResponse({ status: 201, type: BattleStartRouteResponse })
  @ApiResponse({ status: 400, type: BattleStartRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Body() body: BattleStartRouteBody,
  ): Promise<BattleStartRouteResponse> {
    const interactorRequest = StartBattleInteractorRequest.parse(
      request.user.userId,
      body.levelId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new BattleStartRouteResponse(interactorResponse);
  }
}
