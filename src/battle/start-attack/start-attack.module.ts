import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StartAttackInteractor } from './adapter/interactor/start-attack.interactor';
import { StartAttackRepository } from './adapter/interface/start-attack.repository';
import { StartAttackTypeOrmMySqlRepository } from './infrastructure/start-attack.typeorm.mysql.repository';
import { StartAttackRoute } from './presentation/start-attack.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    StartAttackInteractor,
    {
      provide: StartAttackRepository,
      useClass: StartAttackTypeOrmMySqlRepository,
    },
  ],
  controllers: [StartAttackRoute],
})
export class StartAttackModule {}
