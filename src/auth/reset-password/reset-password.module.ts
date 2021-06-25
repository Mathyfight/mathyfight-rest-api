import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResetPasswordRepository } from './application/adapter/reset-password.repository';
import { ResetPasswordAppService } from './application/service/reset-password.app.service';
import { ResetPasswordTypeOrmMySqlRepository } from './infrastructure/reset-password.typeorm.mysql.repository';
import { ResetPasswordRoute } from './presentation/reset-password.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    ResetPasswordAppService,
    {
      provide: ResetPasswordRepository,
      useClass: ResetPasswordTypeOrmMySqlRepository,
    },
  ],
  controllers: [ResetPasswordRoute],
})
export class ResetPasswordModule {}
