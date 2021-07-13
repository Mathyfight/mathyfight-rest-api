import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInteractor } from '../adapter/interactor/login.interactor';
import { LoginInteractorRequest } from '../adapter/interactor/login.interactor.request';
import { AuthLoginRouteBody } from './auth-login.route.body';
import { AuthLoginRouteErrors } from './auth-login.route.errors';
import { AuthLoginRouteResponse } from './auth-login.route.response';

@ApiTags('auth')
@Controller('auth')
export class AuthLoginRoute {
  constructor(readonly loginAppService: LoginInteractor) {}

  @Post('login')
  @ApiResponse({ status: 201, type: AuthLoginRouteResponse })
  @ApiResponse({ status: 400, type: AuthLoginRouteErrors })
  async loginRoute(
    @Body() body: AuthLoginRouteBody,
  ): Promise<AuthLoginRouteResponse> {
    const serviceRequest = LoginInteractorRequest.parse(
      body.username,
      body.password,
    );
    const serviceResponse = await this.loginAppService.invoke(serviceRequest);
    return AuthLoginRouteResponse.fromServiceResponse(serviceResponse);
  }
}
