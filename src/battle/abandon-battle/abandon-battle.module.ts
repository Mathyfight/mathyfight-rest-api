import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AbandonBattleInteractor } from './adapter/interactor/abandon-battle.interactor';
import { AbandonBattleRepository } from './adapter/interface/abandon-battle.repository';
import { AbandonBattleTypeOrmMySqlRepository } from './infrastructure/abandon-battle.typeorm.mysql.repository';
import { BattleAbandonRoute } from './presentation/battle-abandon.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AbandonBattleInteractor,
    {
      provide: AbandonBattleRepository,
      useClass: AbandonBattleTypeOrmMySqlRepository,
    },
  ],
  controllers: [BattleAbandonRoute],
})
export class AbandonBattleModule {}
