import { Module } from '@nestjs/common';
import { StartBattleModule } from './start-battle/start-battle.module';

@Module({
  imports: [StartBattleModule],
})
export class BattleModule {}
