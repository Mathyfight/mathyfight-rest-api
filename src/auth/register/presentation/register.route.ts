import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAppService } from '../application/service/register.app.service';
import { RegisterAppServiceRequest } from '../application/service/register.app.service.request';
import { RegisterRouteBodyRequest } from './register.route.body.request';
import { RegisterRouteErrors } from './register.route.errors';

@ApiTags('auth')
@Controller('auth')
export class RegisterRoute {
  constructor(readonly registerAppService: RegisterAppService) {}

  @Post('register')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: RegisterRouteErrors })
  async registerRoute(@Body() body: RegisterRouteBodyRequest): Promise<void> {
    const serviceRequest = RegisterAppServiceRequest.parse(
      body.username,
      body.password,
      body.email,
    );
    await this.registerAppService.invoke(serviceRequest);
  }
}
