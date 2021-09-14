import { ApiProperty } from '@nestjs/swagger';
import { AdminEditMathProblemErrors } from '../domain/value-object/admin-edit-math-problem.errors';

export class AdminMathProblemEditRouteErrors
  implements AdminEditMathProblemErrors
{
  @ApiProperty()
  mathAnswersIds!: string[];

  @ApiProperty()
  mathProblemId!: string[];

  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  difficultyId!: string[];

  @ApiProperty()
  description!: string[];

  @ApiProperty()
  mathAnswersDescription!: string[];

  @ApiProperty()
  mathAnswersIsCorrect!: string[];

  @ApiProperty()
  errors!: string[];
}
