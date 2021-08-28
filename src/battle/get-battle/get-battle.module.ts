import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetBattleInteractor } from './adapter/interactor/get-battle.interactor';
import { GetBattleRepository } from './adapter/interface/get-battle.repository';
import { GetBattleTypeOrmMySqlRepository } from './infrastructure/get-battle.typeorm.mysql.repository';
import { BattleGetRoute } from './presentation/battle-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetBattleInteractor,
    {
      provide: GetBattleRepository,
      useClass: GetBattleTypeOrmMySqlRepository,
    },
  ],
  controllers: [BattleGetRoute],
})
export class GetBattleModule {}
