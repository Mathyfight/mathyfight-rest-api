import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAppService } from '../application/service/login.app.service';
import { LoginAppServiceRequest } from '../application/service/login.app.service.request';
import { AuthLoginRouteBodyRequest } from './auth-login.route.body.request';
import { AuthLoginRouteErrors } from './auth-login.route.errors';
import { AuthLoginRouteResponse } from './auth-login.route.response';

@ApiTags('auth')
@Controller('auth')
export class AuthLoginRoute {
  constructor(readonly loginAppService: LoginAppService) {}

  @Post('login')
  @ApiResponse({ status: 201, type: AuthLoginRouteResponse })
  @ApiResponse({ status: 400, type: AuthLoginRouteErrors })
  async loginRoute(
    @Body() body: AuthLoginRouteBodyRequest,
  ): Promise<AuthLoginRouteResponse> {
    const serviceRequest = LoginAppServiceRequest.parse(
      body.username,
      body.password,
    );
    const serviceResponse = await this.loginAppService.invoke(serviceRequest);
    return AuthLoginRouteResponse.fromServiceResponse(serviceResponse);
  }
}
