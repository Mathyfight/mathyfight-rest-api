import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterInteractor } from '../adapter/interactor/register.interactor';
import { RegisterInteractorRequest } from '../adapter/interactor/register.interactor.request';
import { AuthRegisterRouteBody } from './auth-register.route.body';
import { AuthRegisterRouteErrors } from './auth-register.route.errors';

@ApiTags('auth')
@Controller('auth')
export class AuthRegisterRoute {
  constructor(readonly registerAppService: RegisterInteractor) {}

  @Post('register')
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: AuthRegisterRouteErrors })
  async registerRoute(@Body() body: AuthRegisterRouteBody): Promise<void> {
    const serviceRequest = RegisterInteractorRequest.parse(
      body.username,
      body.password,
      body.email,
    );
    await this.registerAppService.invoke(serviceRequest);
  }
}
