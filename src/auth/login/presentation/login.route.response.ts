import { ApiProperty } from '@nestjs/swagger';
import { LoginAppServiceResponse } from '../application/service/login.app.service.response';

export class LoginRouteResponse {
  @ApiProperty()
  public readonly jsonWebToken: string;

  constructor(jsonWebToken: string) {
    this.jsonWebToken = jsonWebToken;
  }

  static fromServiceResponse(
    response: LoginAppServiceResponse,
  ): LoginRouteResponse {
    return new LoginRouteResponse(response.jsonWebToken);
  }
}
