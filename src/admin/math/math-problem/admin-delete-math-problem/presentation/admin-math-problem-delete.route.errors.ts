import { ApiProperty } from '@nestjs/swagger';
import { AdminDeleteMathProblemErrors } from '../domain/value-object/admin-delete-math-problem.errors';

export class AdminMathProblemDeleteRouteErrors
  implements AdminDeleteMathProblemErrors
{
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  mathProblemId!: string[];
}
