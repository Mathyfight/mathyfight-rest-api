import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordAppService } from '../application/service/reset-password.app.service';
import { ResetPasswordAppServiceRequest } from '../application/service/reset-password.app.service.request';
import { AuthResetPasswordRouteBodyRequest } from './auth-reset-password.route.body.request';
import { AuthResetPasswordRouteErrors } from './auth-reset-password.route.errors';
import { AuthResetPasswordRouteParamsRequest } from './auth-reset-password.route.params.request';

@ApiTags('auth')
@Controller('auth')
export class AuthResetPasswordRoute {
  constructor(readonly appService: ResetPasswordAppService) {}

  @Put('reset-password/:resetPasswordTokenId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: AuthResetPasswordRouteErrors })
  async resetPasswordRoute(
    @Param() params: AuthResetPasswordRouteParamsRequest,
    @Body() body: AuthResetPasswordRouteBodyRequest,
  ): Promise<void> {
    const serviceRequest = ResetPasswordAppServiceRequest.parse(
      params.resetPasswordTokenId,
      body.password,
    );
    await this.appService.invoke(serviceRequest);
  }
}
