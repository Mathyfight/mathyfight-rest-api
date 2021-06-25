import { Module } from '@nestjs/common';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [RegisterModule, LoginModule, ForgotPasswordModule],
})
export class AuthModule {}
