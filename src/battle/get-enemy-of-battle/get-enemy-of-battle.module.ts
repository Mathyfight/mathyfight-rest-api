import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetEnemyOfBattleInteractor } from './adapter/interactor/get-enemy-of-battle.interactor';
import { GetEnemyOfBattleRepository } from './adapter/interface/get-enemy-of-battle.repository';
import { GetEnemyOfBattleTypeOrmMySqlRepository } from './infrastructure/get-enemy-of-battle.typeorm.mysql.repository';
import { BattleGetEnemyRoute } from './presentation/battle-get-enemy.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetEnemyOfBattleInteractor,
    {
      provide: GetEnemyOfBattleRepository,
      useClass: GetEnemyOfBattleTypeOrmMySqlRepository,
    },
  ],
  controllers: [BattleGetEnemyRoute],
})
export class GetEnemyOfBattleModule {}
