import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BattleGetRouteParams {
  @ApiProperty()
  @IsString()
  readonly battleId: string;

  constructor(battleId: string) {
    this.battleId = battleId;
  }
}
