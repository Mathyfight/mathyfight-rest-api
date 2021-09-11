import { ApiProperty } from '@nestjs/swagger';

export class AdminMathProblemDeleteRouteParams {
  @ApiProperty()
  readonly mathProblemId!: string;
}
