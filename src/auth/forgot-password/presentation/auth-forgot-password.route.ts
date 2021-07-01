import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordAppService } from '../application/service/forgot-password.app.service';
import { ForgotPasswordAppServiceRequest } from '../application/service/forgot-password.app.service.request';
import { AuthForgotPasswordRouteBodyRequest } from './auth-forgot-password.route.body.request';
import { AuthForgotPasswordRouteErrors } from './auth-forgot-password.route.errors';

@ApiTags('auth')
@Controller('auth')
export class AuthForgotPasswordRoute {
  constructor(readonly appService: ForgotPasswordAppService) {}

  @Post('forgot-password')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: AuthForgotPasswordRouteErrors })
  async forgotPasswordRoute(
    @Body() body: AuthForgotPasswordRouteBodyRequest,
  ): Promise<void> {
    const serviceRequest = ForgotPasswordAppServiceRequest.parse(body.email);
    await this.appService.invoke(serviceRequest);
  }
}
