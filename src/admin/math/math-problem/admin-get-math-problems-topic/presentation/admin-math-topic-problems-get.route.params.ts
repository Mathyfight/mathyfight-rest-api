import { ApiProperty } from '@nestjs/swagger';

export class AdminMathTopicProblemsGetRouteParams {
  @ApiProperty()
  mathTopicId!: string;
}
