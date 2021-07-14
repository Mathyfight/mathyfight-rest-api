import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmailSender } from './adapter/interface/email.sender';
import { ForgotPasswordRepository } from './adapter/interface/forgot-password.repository';
import { ForgotPasswordInteractor } from './adapter/interactor/forgot-password.interactor';
import { EmailSendgridSender } from './infrastructure/email.sendgrid.sender';
import { ForgotPasswordTypeOrmMySqlRepository } from './infrastructure/forgot-password.typeorm.mysql.repository';
import { AuthForgotPasswordRoute } from './presentation/auth-forgot-password.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    ForgotPasswordInteractor,
    {
      provide: ForgotPasswordRepository,
      useClass: ForgotPasswordTypeOrmMySqlRepository,
    },
    {
      provide: EmailSender,
      useClass: EmailSendgridSender,
    },
  ],
  controllers: [AuthForgotPasswordRoute],
})
export class ForgotPasswordModule {}
