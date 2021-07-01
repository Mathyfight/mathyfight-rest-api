import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { GetGeneralInfoAppService } from '../application/service/get-general-info.app.service';
import { GetGeneralInfoAppServiceRequest } from '../application/service/get-general-info.app.service.request';
import { GetGeneralInfoRouteErrors } from './get-general-info.route.errors';
import { GetGeneralInfoRouteResponse } from './get-general-info.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('player')
@Controller('player')
export class GetGeneralInfoRoute {
  constructor(readonly appService: GetGeneralInfoAppService) {}

  @Get('general-info')
  @ApiResponse({ status: 200, type: GetGeneralInfoRouteResponse })
  @ApiResponse({ status: 400, type: GetGeneralInfoRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
  ): Promise<GetGeneralInfoRouteResponse> {
    const serviceRequest = GetGeneralInfoAppServiceRequest.parse(
      request.user.userId,
    );
    const serviceResponse = await this.appService.invoke(serviceRequest);
    return GetGeneralInfoRouteResponse.fromServiceResponse(serviceResponse);
  }
}
