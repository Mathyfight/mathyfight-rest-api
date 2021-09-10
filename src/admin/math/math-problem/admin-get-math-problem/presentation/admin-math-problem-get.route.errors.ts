import { ApiProperty } from '@nestjs/swagger';
import { AdminGetMathProblemErrors } from '../domain/value-object/admin-get-math-problem.errors';

export class AdminMathProblemGetRouteErrors
  implements AdminGetMathProblemErrors
{
  @ApiProperty()
  userId!: string[];
  @ApiProperty()
  mathProblemId!: string[];
}
