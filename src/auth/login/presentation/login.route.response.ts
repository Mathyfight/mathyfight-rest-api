import { LoginAppServiceResponse } from '../application/service/login.app.service.response';

export class LoginRouteResponse {
  readonly jsonWebToken: string;

  constructor(jsonWebToken: string) {
    this.jsonWebToken = jsonWebToken;
  }

  static fromServiceResponse(
    response: LoginAppServiceResponse,
  ): LoginRouteResponse {
    return new LoginRouteResponse(response.jsonWebToken);
  }
}
