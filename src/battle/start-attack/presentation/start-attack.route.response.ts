import { ApiProperty } from '@nestjs/swagger';
import {
  StartAttackAnswerInteractorResponse,
  StartAttackInteractorResponse,
} from '../adapter/interactor/start-attack.interactor.response';

export class StartAttackAnswerRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly description: string;

  constructor(intRes: StartAttackAnswerInteractorResponse) {
    this.description = intRes.description;
    this.id = intRes.id;
  }
}

export class StartAttackRouteResponse {
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly problemImageUrl: string | null;

  @ApiProperty({ type: [StartAttackAnswerRouteResponse] })
  readonly answers: StartAttackAnswerRouteResponse[];

  constructor(intRes: StartAttackInteractorResponse) {
    this.problemImageUrl = intRes.problemImageUrl;
    this.description = intRes.description;
    this.answers = intRes.answers.map(
      (a) => new StartAttackAnswerRouteResponse(a),
    );
  }
}
