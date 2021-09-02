import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

export class EnemiesGetRouteQueries {
  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBooleanString()
  available?: string;
}
