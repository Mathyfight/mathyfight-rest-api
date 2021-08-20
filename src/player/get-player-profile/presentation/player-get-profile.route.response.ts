import { ApiProperty } from '@nestjs/swagger';
import { GetPlayerProfileInteractorResponse } from '../adapter/interactor/get-player-profile.interactor.response';

export class PlayerGetProfileRouteResponse {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  constructor(intRes: GetPlayerProfileInteractorResponse) {
    this.username = intRes.username;
    this.email = intRes.email;
  }
}
