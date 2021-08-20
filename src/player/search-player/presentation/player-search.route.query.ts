import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlayerSearchRouteQuery {
  @ApiProperty()
  @IsString()
  readonly username!: string;
}
