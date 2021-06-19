import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAppService } from '../application/service/register.app.service';
import { RegisterAppServiceRequest } from '../application/service/register.app.service.request';
import { RegisterRouteBodyRequest } from './register.route.body.request';

@ApiTags('auth')
@Controller('auth')
export class RegisterRoute {
  constructor(readonly registerAppService: RegisterAppService) {}

  @Post('register')
  async registerRoute(@Body() body: RegisterRouteBodyRequest): Promise<void> {
    const serviceRequest = RegisterAppServiceRequest.parse(
      body.username,
      body.password,
      body.email,
    );
    await this.registerAppService.invoke(serviceRequest);
  }
}
