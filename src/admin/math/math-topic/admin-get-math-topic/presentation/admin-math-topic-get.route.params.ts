import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminMathTopicGetRouteParams {
  @ApiProperty()
  @IsString()
  mathTopicId!: string;
}
