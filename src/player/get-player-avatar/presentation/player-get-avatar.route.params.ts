import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlayerGetAvatarRouteParams {
  @ApiProperty()
  @IsString()
  readonly userId!: string;
}
