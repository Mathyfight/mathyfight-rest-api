import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MathGetTopicRouteParams {
  @ApiProperty()
  @IsString()
  readonly topicId: string = '';
}
