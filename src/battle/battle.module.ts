import { Module } from '@nestjs/common';
import { AbandonBattleModule } from './abandon-battle/abandon-battle.module';
import { GetBattleModule } from './get-battle/get-battle.module';
import { GetEnemyOfBattleModule } from './get-enemy-of-battle/get-enemy-of-battle.module';
import { StartAttackModule } from './start-attack/start-attack.module';
import { StartBattleModule } from './start-battle/start-battle.module';
import { TryAttackModule } from './try-attack/try-attack.module';

@Module({
  imports: [
    StartBattleModule,
    AbandonBattleModule,
    GetEnemyOfBattleModule,
    GetBattleModule,
    StartAttackModule,
    TryAttackModule,
  ],
})
export class BattleModule {}
