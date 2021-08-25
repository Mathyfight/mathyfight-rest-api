import { ApiProperty } from '@nestjs/swagger';
import { GetMathTopicsByAreaErrors } from '../domain/value-object/get-math-topics-by-area.errors';

export class MathGetTopicsByAreaRouteErrors
  implements GetMathTopicsByAreaErrors
{
  @ApiProperty()
  readonly areaId: string[] = [];
}
