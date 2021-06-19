import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterRepository } from './application/adapter/register.repository';
import { RegisterAppService } from './application/service/register.app.service';
import { RegisterTypeOrmMySqlRepository } from './infrastructure/register.typeorm.mysql.repository';
import { RegisterRoute } from './presentation/register.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    RegisterAppService,
    {
      provide: RegisterRepository,
      useClass: RegisterTypeOrmMySqlRepository,
    },
  ],
  controllers: [RegisterRoute],
})
export class RegisterModule {}
