import { ApiProperty } from '@nestjs/swagger';
import { AbandonBattleErrors } from '../domain/value-object/abandon-battle.errors';

export class BattleAbandonRouteErrors implements AbandonBattleErrors {
  @ApiProperty()
  battleId: string[] = [];

  @ApiProperty()
  userId: string[] = [];
}
