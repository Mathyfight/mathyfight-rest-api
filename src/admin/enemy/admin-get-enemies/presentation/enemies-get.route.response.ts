import { ApiProperty } from '@nestjs/swagger';
import { GetEnemiesInteractorResponse } from '../adapter/interactor/get-enemies.interactor.response';

export class AdminEnemiesGetRouteResponse {
  @ApiProperty()
  readonly id: string = '';

  @ApiProperty()
  readonly name: string = '';

  @ApiProperty()
  readonly imageUrl: string = '';

  constructor(interactorResponse: GetEnemiesInteractorResponse) {
    this.id = interactorResponse.id;
    this.name = interactorResponse.name;
    this.imageUrl = interactorResponse.imageUrl;
  }
}
