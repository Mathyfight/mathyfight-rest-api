import { ApiProperty } from '@nestjs/swagger';
import { TryAttackInteractorResponse } from '../adapter/interactor/try-attack.interactor.response';

export class BattleTryAttackRouteResponse {
  @ApiProperty()
  readonly problemSolved: boolean;

  constructor(intRes: TryAttackInteractorResponse) {
    this.problemSolved = intRes.problemSolved;
  }
}
