import { Module } from '@nestjs/common';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
  imports: [
    RegisterModule,
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class AuthModule {}
