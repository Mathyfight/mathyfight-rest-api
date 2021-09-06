import { ApiProperty } from '@nestjs/swagger';
import { AdminGetMathProblemsByTopicInteractorResponse } from '../adapter/interactor/admin-get-math-problems-by-topic.interactor.response';

export class AdminMathTopicProblemsGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficulty: string;

  constructor(intRes: AdminGetMathProblemsByTopicInteractorResponse) {
    this.description = intRes.description;
    this.difficulty = intRes.difficulty;
    this.id = intRes.id;
  }
}
