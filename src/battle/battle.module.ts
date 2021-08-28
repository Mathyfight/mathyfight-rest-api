import { Module } from '@nestjs/common';
import { GetBattleModule } from './get-battle/get-battle.module';
import { GetEnemyOfBattleModule } from './get-enemy-of-battle/get-enemy-of-battle.module';
import { StartBattleModule } from './start-battle/start-battle.module';

@Module({
  imports: [StartBattleModule, GetEnemyOfBattleModule, GetBattleModule],
})
export class BattleModule {}
