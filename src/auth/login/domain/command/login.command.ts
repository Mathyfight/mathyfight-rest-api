import { GenerateJwt } from './generate-jwt';

export class LoginCommand {
  constructor(readonly generateJwt: GenerateJwt) {}
}
