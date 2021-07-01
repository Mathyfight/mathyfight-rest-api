import { ApiProperty } from '@nestjs/swagger';
import { LoginAppServiceResponse } from '../application/service/login.app.service.response';

export class AuthLoginRouteResponse {
  @ApiProperty()
  public readonly jsonWebToken: string;

  constructor(jsonWebToken: string) {
    this.jsonWebToken = jsonWebToken;
  }

  static fromServiceResponse(
    response: LoginAppServiceResponse,
  ): AuthLoginRouteResponse {
    return new AuthLoginRouteResponse(response.jsonWebToken);
  }
}
