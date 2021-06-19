import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAppService } from '../application/service/login.app.service';
import { LoginAppServiceRequest } from '../application/service/login.app.service.request';
import { LoginRouteBodyRequest } from './login.route.body.request';
import { LoginRouteResponse } from './login.route.response';

@ApiTags('auth')
@Controller('auth')
export class LoginRoute {
  constructor(readonly loginAppService: LoginAppService) {}

  @Post('login')
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
