import { RegisterErrors } from '../value-object/register.errors';
import { RegisterNewUser } from './register-new-user';

export class RegisterCommand {
  static readonly usernameNotUnique =
    'El nombre de usuario ya se encuentra registrado';
  static readonly emailNotUnique =
    'El correo electrónico ya se encuentra registrado';

  private constructor(readonly registerNewUser: RegisterNewUser) {}

  static new(
    userIdFromUsername: string | null,
    userIdFromEmail: string | null,
    password: string,
    username: string,
    email: string,
    raceId: string,
    mathTopicLevelIds: string[],
    errors: RegisterErrors,
  ): RegisterCommand | null {
    if (userIdFromUsername !== null)
      errors.username.push(this.usernameNotUnique);

    if (userIdFromEmail !== null) errors.email.push(this.emailNotUnique);

    if (userIdFromUsername !== null || userIdFromEmail !== null) return null;

    return new RegisterCommand(
      new RegisterNewUser(password, raceId, mathTopicLevelIds, username, email),
    );
  }
}
