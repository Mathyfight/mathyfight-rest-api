import { ApiProperty } from '@nestjs/swagger';
import { LoginInteractorResponse } from '../adapter/interactor/login.interactor.response';

export class AuthLoginRouteResponse {
  @ApiProperty()
  public readonly jsonWebToken: string;

  constructor(jsonWebToken: string) {
    this.jsonWebToken = jsonWebToken;
  }

  static fromServiceResponse(
    response: LoginInteractorResponse,
  ): AuthLoginRouteResponse {
    return new AuthLoginRouteResponse(response.jsonWebToken);
  }
}
