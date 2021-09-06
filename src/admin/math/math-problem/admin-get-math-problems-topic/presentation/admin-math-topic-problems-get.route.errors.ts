import { ApiProperty } from '@nestjs/swagger';
import { AdminGetMathProblemsByTopicErrors } from '../domain/value-object/admin-get-math-problems-by-topic.errors';

export class AdminMathTopicProblemsGetRouteErrors
  implements AdminGetMathProblemsByTopicErrors
{
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  mathTopicId!: string[];
}
