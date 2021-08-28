import { ApiProperty } from '@nestjs/swagger';
import { StartBattleInteractorResponse } from '../adapter/interactor/start-battle.interactor.response';

export class BattleStartRouteResponse {
  @ApiProperty()
  readonly battleId: string;

  constructor(interactorResponse: StartBattleInteractorResponse) {
    this.battleId = interactorResponse.battleId;
  }
}
