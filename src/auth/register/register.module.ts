import { Module } from '@nestjs/common';
import { RegisterInteractor } from './domain/interactors/register.interactor';
import { RegisterRoute } from './presentation/register.route';

@Module({
  providers: [RegisterInteractor],
  controllers: [RegisterRoute],
})
export class RegisterModule {}
