import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BattleStartRouteBody {
  @ApiProperty()
  @IsString()
  readonly levelId: string = '';
}
