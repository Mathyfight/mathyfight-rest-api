import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminMathTopicEditRouteParams {
  @ApiProperty()
  @IsString()
  readonly mathTopicId!: string;
}
