import {
  Request,
  Controller,
  UseGuards,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { TryAttackInteractor } from '../adapter/interactor/try-attack.interactor';
import { TryAttackInteractorRequest } from '../adapter/interactor/try-attack.interactor.request';
import { BattleTryAttackRouteBody } from './battle-try-attack.route.body';
import { BattleTryAttackRouteErrors } from './battle-try-attack.route.errors';
import { BattleTryAttackRouteParams } from './battle-try-attack.route.params';
import { BattleTryAttackRouteResponse } from './battle-try-attack.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class BattleTryAttackRoute {
  constructor(readonly interactor: TryAttackInteractor) {}

  @Put(':battleId/try-attack')
  @ApiResponse({ status: 200, type: BattleTryAttackRouteResponse })
  @ApiResponse({ status: 400, type: BattleTryAttackRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: BattleTryAttackRouteParams,
    @Body() body: BattleTryAttackRouteBody,
  ): Promise<BattleTryAttackRouteResponse> {
    const interactorRequest = TryAttackInteractorRequest.parse(
      request.user.userId,
      params.battleId,
      body.answerId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new BattleTryAttackRouteResponse(interactorResponse);
  }
}
