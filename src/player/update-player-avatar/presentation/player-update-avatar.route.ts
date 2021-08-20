import { Controller, UseGuards, Request, Patch, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { UpdatePlayerAvatarInteractor } from '../adapter/interactor/update-player-avatar.interactor';
import { UpdatePlayerAvatarInteractorRequest } from '../adapter/interactor/update-player-avatar.interactor.request';
import { PlayerUpdateAvatarRouteBody } from './player-update-avatar.route.body';
import { PlayerUpdateAvatarRouteErrors } from './player-update-avatar.route.errors';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerUpdateAvatarRoute {
  constructor(readonly interactor: UpdatePlayerAvatarInteractor) {}

  @Patch('avatar')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: PlayerUpdateAvatarRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Body() body: PlayerUpdateAvatarRouteBody,
  ): Promise<void> {
    const intRequest = UpdatePlayerAvatarInteractorRequest.parse(
      request.user.userId,
      body.raceId,
      body.color,
    );
    await this.interactor.invoke(intRequest);
  }
}
