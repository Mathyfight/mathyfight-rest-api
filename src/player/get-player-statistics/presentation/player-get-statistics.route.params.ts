import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlayerGetStatisticsRouteParams {
  @ApiProperty()
  @IsString()
  readonly userId!: string;
}
