import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordInteractor } from '../adapter/interactor/forgot-password.interactor';
import { ForgotPasswordInteractorRequest } from '../adapter/interactor/forgot-password.interactor.request';
import { AuthForgotPasswordRouteBody } from './auth-forgot-password.route.body';
import { AuthForgotPasswordRouteErrors } from './auth-forgot-password.route.errors';

@ApiTags('auth')
@Controller('auth')
export class AuthForgotPasswordRoute {
  constructor(readonly appService: ForgotPasswordInteractor) {}

  @Post('forgot-password')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: AuthForgotPasswordRouteErrors })
  async forgotPasswordRoute(
    @Body() body: AuthForgotPasswordRouteBody,
  ): Promise<void> {
    const serviceRequest = ForgotPasswordInteractorRequest.parse(body.email);
    await this.appService.invoke(serviceRequest);
  }
}
