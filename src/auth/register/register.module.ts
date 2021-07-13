import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterRepository } from './adapter/interface/register.repository';
import { RegisterInteractor } from './adapter/interactor/register.interactor';
import { RegisterTypeOrmMySqlRepository } from './infrastructure/register.typeorm.mysql.repository';
import { AuthRegisterRoute } from './presentation/auth-register.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    RegisterInteractor,
    {
      provide: RegisterRepository,
      useClass: RegisterTypeOrmMySqlRepository,
    },
  ],
  controllers: [AuthRegisterRoute],
})
export class RegisterModule {}
