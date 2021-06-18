import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterInteractor } from '../domain/interactors/register.interactor';
import { RegisterInteractorRequest } from '../domain/interactors/register.interactor.request';
import { RegisterRouteBodyRequest } from './register.route.body.request';

@ApiTags('auth')
@Controller('auth')
export class RegisterRoute {
  constructor(readonly registerInteractor: RegisterInteractor) {}

  @Post('register')
  async registerRoute(@Body() body: RegisterRouteBodyRequest): Promise<void> {
    const interactorRequest = RegisterInteractorRequest.parse(
      body.username,
      body.password,
      body.email,
    );
    await this.registerInteractor.invoke(interactorRequest);
  }
}
