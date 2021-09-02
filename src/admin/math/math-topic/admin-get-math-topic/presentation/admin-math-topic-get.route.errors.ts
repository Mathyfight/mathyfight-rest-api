import { ApiProperty } from '@nestjs/swagger';
import { AdminGetMathTopicErrors } from '../domain/value-object/admin-get-math-topic.errors';

export class AdminMathTopicGetRouteErrors implements AdminGetMathTopicErrors {
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  mathTopicId!: string[];
}
