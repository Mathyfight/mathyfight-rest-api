import { ApiProperty } from '@nestjs/swagger';

export class AdminMathDeleteTopicRouteParams {
  @ApiProperty()
  topicId!: string;
}
