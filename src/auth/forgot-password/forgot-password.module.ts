import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmailSender } from './application/adapter/email.sender';
import { ForgotPasswordRepository } from './application/adapter/forgot-password.repository';
import { ForgotPasswordAppService } from './application/service/forgot-password.app.service';
import { EmailSendgridSender } from './infrastructure/email.sendgrid.sender';
import { ForgotPasswordTypeOrmMySqlRepository } from './infrastructure/forgot-password.typeorm.mysql.repository';
import { AuthForgotPasswordRoute } from './presentation/auth-forgot-password.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    ForgotPasswordAppService,
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
