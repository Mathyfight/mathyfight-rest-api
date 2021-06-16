import { Module } from '@nestjs/common';
import { RegisterRoute } from './register/presentation/register.route';

@Module({
  controllers: [RegisterRoute],
})
export class AuthModule {}
