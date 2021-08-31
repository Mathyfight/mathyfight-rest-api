import { ApiProperty } from '@nestjs/swagger';
import { AddEnemyInteractorResponse } from '../adapter/interactor/add-enemy.interactor.response';

export class AdminEnemyAddRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(interactorResponse: AddEnemyInteractorResponse) {
    this.id = interactorResponse.id;
    this.imageUrl = interactorResponse.imageUrl;
  }
}
