import { ApiProperty } from '@nestjs/swagger';
import { GetBattleErrors } from '../domain/value-object/get-battle.errors';

export class BattleGetRouteErrors implements GetBattleErrors {
  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  battleId: string[] = [];
}
