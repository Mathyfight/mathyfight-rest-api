import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StartBattleInteractor } from './adapter/interactor/start-battle.interactor';
import { StartBattleRepository } from './adapter/interface/start-battle.repository';
import { StartBattleTypeOrmMySqlRepository } from './infrastructure/start-battle.typeorm.mysql.repository';
import { BattleStartRoute } from './presentation/battle-start.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    StartBattleInteractor,
    {
      provide: StartBattleRepository,
      useClass: StartBattleTypeOrmMySqlRepository,
    },
  ],
  controllers: [BattleStartRoute],
})
export class StartBattleModule {}
