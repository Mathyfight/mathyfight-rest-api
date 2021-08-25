import { ApiProperty } from '@nestjs/swagger';
import { GetMathTopicErrors } from '../domain/value-object/get-math-topic.errors';

export class MathGetTopicRouteErrors implements GetMathTopicErrors {
  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  topicId: string[] = [];
}
