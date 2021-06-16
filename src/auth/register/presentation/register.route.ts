import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterInteractorRequest } from '../domain/interactor/register.interactor.request';
import { RegisterRouteBodyRequest } from './register.route.body.request';

@ApiTags('auth')
@Controller('auth')
export class RegisterRoute {
  @Post('register')
  registerRoute(@Body() body: RegisterRouteBodyRequest): void {
    const interactorRequest = RegisterInteractorRequest.parse(
      body.username,
      body.password,
      body.email,
    );
  }
}
