import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResetPasswordRepository } from './application/adapter/reset-password.repository';
import { ResetPasswordAppService } from './application/service/reset-password.app.service';
import { ResetPasswordTypeOrmMySqlRepository } from './infrastructure/reset-password.typeorm.mysql.repository';
import { AuthResetPasswordRoute } from './presentation/auth-reset-password.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    ResetPasswordAppService,
    {
      provide: ResetPasswordRepository,
      useClass: ResetPasswordTypeOrmMySqlRepository,
    },
  ],
  controllers: [AuthResetPasswordRoute],
})
export class ResetPasswordModule {}
