import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordAppService } from '../application/service/reset-password.app.service';
import { ResetPasswordAppServiceRequest } from '../application/service/reset-password.app.service.request';
import { ResetPasswordRouteBodyRequest } from './reset-password.route.body.request';
import { ResetPasswordRouteErrors } from './reset-password.route.errors';
import { ResetPasswordRouteParamsRequest } from './reset-password.route.params.request';

@ApiTags('auth')
@Controller('auth')
export class ResetPasswordRoute {
  constructor(readonly appService: ResetPasswordAppService) {}

  @Put('reset-password/:resetPasswordTokenId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: ResetPasswordRouteErrors })
  async resetPasswordRoute(
    @Param() params: ResetPasswordRouteParamsRequest,
    @Body() body: ResetPasswordRouteBodyRequest,
  ): Promise<void> {
    const serviceRequest = ResetPasswordAppServiceRequest.parse(
      params.resetPasswordTokenId,
      body.password,
    );
    await this.appService.invoke(serviceRequest);
  }
}
