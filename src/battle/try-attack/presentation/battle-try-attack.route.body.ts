import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BattleTryAttackRouteBody {
  @ApiProperty()
  @IsString()
  readonly answerId: string;

  constructor(answerId: string) {
    this.answerId = answerId;
  }
}
