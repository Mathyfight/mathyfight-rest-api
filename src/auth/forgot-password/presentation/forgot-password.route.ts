import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordAppService } from '../application/service/forgot-password.app.service';
import { ForgotPasswordAppServiceRequest } from '../application/service/forgot-password.app.service.request';
import { ForgotPasswordRouteBodyRequest } from './forgot-password.route.body.request';
import { ForgotPasswordRouteErrors } from './forgot-password.route.errors';

@ApiTags('auth')
@Controller('auth')
export class ForgotPasswordRoute {
  constructor(readonly appService: ForgotPasswordAppService) {}

  @Post('forgot-password')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ForgotPasswordRouteErrors })
  async forgotPasswordRoute(
    @Body() body: ForgotPasswordRouteBodyRequest,
  ): Promise<void> {
    const serviceRequest = ForgotPasswordAppServiceRequest.parse(body.email);
    await this.appService.invoke(serviceRequest);
  }
}
