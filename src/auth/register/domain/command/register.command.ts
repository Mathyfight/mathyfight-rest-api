import { RegisterNewUser } from './register-new-user';

export class RegisterCommand {
  constructor(readonly registerNewUser: RegisterNewUser) {}
}
