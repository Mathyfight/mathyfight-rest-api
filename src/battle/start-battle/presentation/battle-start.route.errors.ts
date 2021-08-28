import { ApiProperty } from '@nestjs/swagger';
import { StartBattleErrors } from '../domain/value-object/start-battle.errors';

export class BattleStartRouteErrors implements StartBattleErrors {
  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  levelId: string[] = [];
}
