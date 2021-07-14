import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetGeneralInfoInteractor } from '../adapter/interactor/get-general-info.interactor';
import { GetGeneralInfoInteractorRequest } from '../adapter/interactor/get-general-info.interactor.request';
import { PlayerGetGeneralInfoRouteErrors } from './player-get-general-info.route.errors';
import { PlayerGetGeneralInfoRouteResponse } from './player-get-general-info.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerGetGeneralInfoRoute {
  constructor(readonly appService: GetGeneralInfoInteractor) {}

  @Get('general-info')
  @ApiResponse({ status: 200, type: PlayerGetGeneralInfoRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetGeneralInfoRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
  ): Promise<PlayerGetGeneralInfoRouteResponse> {
    const serviceRequest = GetGeneralInfoInteractorRequest.parse(
      request.user.userId,
    );
    const serviceResponse = await this.appService.invoke(serviceRequest);
    return PlayerGetGeneralInfoRouteResponse.fromServiceResponse(
      serviceResponse,
    );
  }
}
