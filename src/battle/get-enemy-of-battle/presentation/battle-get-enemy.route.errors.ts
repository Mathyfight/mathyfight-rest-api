import { ApiProperty } from '@nestjs/swagger';
import { GetEnemyOfBattleErrors } from '../domain/value-object/get-enemy-of-battle.errors';

export class BattleGetEnemyRouteErrors implements GetEnemyOfBattleErrors {
  @ApiProperty()
  battleId: string[] = [];

  @ApiProperty()
  userId: string[] = [];
}
