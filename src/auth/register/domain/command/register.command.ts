import { RegisterErrors } from '../value-object/register.errors';
import { RegisterNewUser } from './register-new-user';

export class RegisterCommand {
  static readonly usernameNotUnique = 'debe no haber sido registrado antes';
  static readonly emailNotUnique = 'debe no haber sido registrado antes';

  private constructor(readonly registerNewUser: RegisterNewUser) {}

  static new(
    userIdFromUsername: string | null,
    userIdFromEmail: string | null,
    password: string,
    username: string,
    email: string,
    errors: RegisterErrors,
  ): RegisterCommand | null {
    if (userIdFromUsername !== null)
      errors.username.push(this.usernameNotUnique);

    if (userIdFromEmail !== null) errors.email.push(this.emailNotUnique);

    if (userIdFromUsername !== null || userIdFromEmail !== null) return null;

    return new RegisterCommand(new RegisterNewUser(password, username, email));
  }
}
