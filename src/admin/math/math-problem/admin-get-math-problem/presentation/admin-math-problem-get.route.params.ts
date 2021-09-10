import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminMathProblemGetRouteParams {
  @ApiProperty()
  @IsString()
  readonly mathProblemId!: string;
}
