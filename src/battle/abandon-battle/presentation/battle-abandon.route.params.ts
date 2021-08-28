import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BattleAbandonRouteParams {
  @ApiProperty()
  @IsString()
  readonly battleId: string = '';
}
