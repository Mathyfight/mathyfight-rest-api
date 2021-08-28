import {
  Request,
  Controller,
  UseGuards,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { StartAttackInteractor } from '../adapter/interactor/start-attack.interactor';
import { StartAttackInteractorRequest } from '../adapter/interactor/start-attack.interactor.request';
import { StartAttackRoutebody } from './start-attack.route.body';
import { StartAttackRouteErrors } from './start-attack.route.errors';
import { StartAttackRouteParams } from './start-attack.route.params';
import { StartAttackRouteResponse } from './start-attack.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('battle')
@Controller('battles')
export class StartAttackRoute {
  constructor(readonly interactor: StartAttackInteractor) {}

  @Post(':battleId/start-attack')
  @ApiResponse({ status: 201, type: StartAttackRouteResponse })
  @ApiResponse({ status: 400, type: StartAttackRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: StartAttackRouteParams,
    @Body() body: StartAttackRoutebody,
  ): Promise<StartAttackRouteResponse> {
    const interactorRequest = StartAttackInteractorRequest.parse(
      body.difficultyId,
      request.user.userId,
      params.battleId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new StartAttackRouteResponse(interactorResponse);
  }
}
