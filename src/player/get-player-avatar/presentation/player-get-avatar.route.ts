import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetPlayerAvatarInteractor } from '../adapter/interactor/get-player-avatar.interactor';
import { GetPlayerAvatarInteractorRequest } from '../adapter/interactor/get-player-avatar.interactor.request';
import { PlayerGetAvatarRouteErrors } from './player-get-avatar.route.errors';
import { PlayerGetAvatarRouteParams } from './player-get-avatar.route.params';
import { PlayerGetAvatarRouteResponse } from './player-get-avatar.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('users')
export class PlayerGetAvatarRoute {
  constructor(readonly interactor: GetPlayerAvatarInteractor) {}

  @Get(':userId/player/avatar')
  @ApiResponse({ status: 200, type: PlayerGetAvatarRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetAvatarRouteErrors })
  async route(
    @Param() params: PlayerGetAvatarRouteParams,
  ): Promise<PlayerGetAvatarRouteResponse> {
    const interactorRequest = GetPlayerAvatarInteractorRequest.new(
      params.userId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new PlayerGetAvatarRouteResponse(interactorResponse);
  }
}
