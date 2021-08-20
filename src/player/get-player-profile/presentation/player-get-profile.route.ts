import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetPlayerProfileInteractor } from '../adapter/interactor/get-player-profile.interactor';
import { GetPlayerProfileInteractorRequest } from '../adapter/interactor/get-player-profile.interactor.request';
import { PlayerGetProfileRouteErrors } from './player-get-profile.route.errors';
import { PlayerGetProfileRouteResponse } from './player-get-profile.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerGetProfileRoute {
  constructor(readonly interactor: GetPlayerProfileInteractor) {}

  @Get('profile')
  @ApiResponse({ status: 200, type: PlayerGetProfileRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetProfileRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
  ): Promise<PlayerGetProfileRouteResponse> {
    const intRequest = GetPlayerProfileInteractorRequest.parse(
      request.user.userId,
    );
    const intRes = await this.interactor.invoke(intRequest);
    return new PlayerGetProfileRouteResponse(intRes);
  }
}
