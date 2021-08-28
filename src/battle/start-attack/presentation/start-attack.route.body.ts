import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StartAttackRoutebody {
  @ApiProperty()
  @IsString()
  readonly difficultyId: string;

  constructor(difficultyId: string) {
    this.difficultyId = difficultyId;
  }
}
