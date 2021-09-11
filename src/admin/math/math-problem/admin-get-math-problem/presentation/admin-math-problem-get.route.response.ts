import { ApiProperty } from '@nestjs/swagger';
import {
  AdminGetMathProblemAnswerInteractorResponse,
  AdminGetMathProblemInteractorResponse,
} from '../adapter/interactor/admin-get-math-problem.interactor.response';

export class AdminMathProblemAnswerGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly isCorrect: boolean;

  constructor(res: AdminGetMathProblemAnswerInteractorResponse) {
    this.description = res.description;
    this.id = res.id;
    this.isCorrect = res.isCorrect;
  }
}

export class AdminMathProblemGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficultyId: string;

  @ApiProperty({ type: String })
  readonly imageUrl: string | null;

  @ApiProperty({ type: [AdminMathProblemAnswerGetRouteResponse] })
  readonly answers: AdminMathProblemAnswerGetRouteResponse[];

  constructor(res: AdminGetMathProblemInteractorResponse) {
    this.answers = res.answers.map(
      (a) => new AdminMathProblemAnswerGetRouteResponse(a),
    );
    this.imageUrl = res.imageUrl;
    this.description = res.description;
    this.difficultyId = res.difficultyId;
    this.id = res.id;
  }
}
