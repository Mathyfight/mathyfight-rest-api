import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterRepository } from './domain/adapters/register.repository';
import { RegisterInteractor } from './domain/interactors/register.interactor';
import { RegisterTypeOrmMySqlRepository } from './infrastructure/register.typeorm.mysql.repository';
import { RegisterRoute } from './presentation/register.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    RegisterInteractor,
    {
      provide: RegisterRepository,
      useClass: RegisterTypeOrmMySqlRepository,
    },
  ],
  controllers: [RegisterRoute],
})
export class RegisterModule {}
