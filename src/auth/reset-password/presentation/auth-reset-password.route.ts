import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordInteractor } from '../adapter/interactor/reset-password.interactor';
import { ResetPasswordInteractorRequest } from '../adapter/interactor/reset-password.interactor.request';
import { AuthResetPasswordRouteBody } from './auth-reset-password.route.body';
import { AuthResetPasswordRouteErrors } from './auth-reset-password.route.errors';
import { AuthResetPasswordRouteParams } from './auth-reset-password.route.params';

@ApiTags('auth')
@Controller('auth')
export class AuthResetPasswordRoute {
  constructor(readonly appService: ResetPasswordInteractor) {}

  @Put('reset-password/:resetPasswordTokenId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: AuthResetPasswordRouteErrors })
  async resetPasswordRoute(
    @Param() params: AuthResetPasswordRouteParams,
    @Body() body: AuthResetPasswordRouteBody,
  ): Promise<void> {
    const serviceRequest = ResetPasswordInteractorRequest.parse(
      params.resetPasswordTokenId,
      body.password,
    );
    await this.appService.invoke(serviceRequest);
  }
}
