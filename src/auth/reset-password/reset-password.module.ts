import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResetPasswordRepository } from './adapter/interface/reset-password.repository';
import { ResetPasswordInteractor } from './adapter/interactor/reset-password.interactor';
import { ResetPasswordTypeOrmMySqlRepository } from './infrastructure/reset-password.typeorm.mysql.repository';
import { AuthResetPasswordRoute } from './presentation/auth-reset-password.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    ResetPasswordInteractor,
    {
      provide: ResetPasswordRepository,
      useClass: ResetPasswordTypeOrmMySqlRepository,
    },
  ],
  controllers: [AuthResetPasswordRoute],
})
export class ResetPasswordModule {}
