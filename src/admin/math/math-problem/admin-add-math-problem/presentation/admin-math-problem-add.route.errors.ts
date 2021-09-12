import { ApiProperty } from '@nestjs/swagger';
import { AdminAddMathProblemErrors } from '../domain/value-object/admin-add-math-problem.errors';

export class AdminMathProblemAddRouteErrors
  implements AdminAddMathProblemErrors
{
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  difficultyId!: string[];

  @ApiProperty()
  mathTopicId!: string[];

  @ApiProperty()
  description!: string[];

  @ApiProperty()
  mathAnswersDescription!: string[];

  @ApiProperty()
  mathAnswersIsCorrect!: string[];

  @ApiProperty()
  errors!: string[];
}
