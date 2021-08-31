import { ApiProperty } from '@nestjs/swagger';
import { AdminDeleteMathTopicErrors } from '../domain/value-object/admin-delete-math-topic.errors';

export class AdminMathDeleteTopicRouteErrors
  implements AdminDeleteMathTopicErrors
{
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  topicId!: string[];
}
