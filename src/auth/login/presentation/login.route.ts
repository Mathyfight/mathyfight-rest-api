import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAppService } from '../application/service/login.app.service';
import { LoginAppServiceRequest } from '../application/service/login.app.service.request';
import { LoginRouteBodyRequest } from './login.route.body.request';
import { LoginRouteErrors } from './login.route.errors';
import { LoginRouteResponse } from './login.route.response';

@ApiTags('auth')
@Controller('auth')
export class LoginRoute {
  constructor(readonly loginAppService: LoginAppService) {}

  @Post('login')
  @ApiResponse({ status: 201, type: LoginRouteResponse })
  @ApiResponse({ status: 400, type: LoginRouteErrors })
  async loginRoute(
    @Body() body: LoginRouteBodyRequest,
  ): Promise<LoginRouteResponse> {
    const serviceRequest = LoginAppServiceRequest.parse(
      body.username,
      body.password,
    );
    const serviceResponse = await this.loginAppService.invoke(serviceRequest);
    return LoginRouteResponse.fromServiceResponse(serviceResponse);
  }
}
