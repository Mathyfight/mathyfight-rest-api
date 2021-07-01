import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetGeneralInfoAppService } from '../application/service/get-general-info.app.service';
import { GetGeneralInfoAppServiceRequest } from '../application/service/get-general-info.app.service.request';
import { PlayerGetGeneralInfoRouteErrors } from './player-get-general-info.route.errors';
import { PlayerGetGeneralInfoRouteResponse } from './player-get-general-info.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class PlayerGetGeneralInfoRoute {
  constructor(readonly appService: GetGeneralInfoAppService) {}

  @Get('general-info')
  @ApiResponse({ status: 200, type: PlayerGetGeneralInfoRouteResponse })
  @ApiResponse({ status: 400, type: PlayerGetGeneralInfoRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
  ): Promise<PlayerGetGeneralInfoRouteResponse> {
    const serviceRequest = GetGeneralInfoAppServiceRequest.parse(
      request.user.userId,
    );
    const serviceResponse = await this.appService.invoke(serviceRequest);
    return PlayerGetGeneralInfoRouteResponse.fromServiceResponse(
      serviceResponse,
    );
  }
}
