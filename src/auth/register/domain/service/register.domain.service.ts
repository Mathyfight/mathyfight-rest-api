import { RegisterNewUser } from '../command/register-new-user';
import { RegisterCommand } from '../command/register.command';
import { RegisterErrors } from '../value-object/register.errors';

export class RegisterDomainService {
  readonly hasToBeUnique = 'debe no haber sido registrado antes';

  invoke(
    userIdFromUsername: string | null,
    userIdFromEmail: string | null,
    password: string,
    username: string,
    email: string,
    errors: RegisterErrors,
  ): RegisterCommand | null {
    if (userIdFromUsername !== null) errors.username.push(this.hasToBeUnique);

    if (userIdFromEmail !== null) errors.email.push(this.hasToBeUnique);

    if (userIdFromUsername !== null || userIdFromEmail !== null) return null;

    return new RegisterCommand(new RegisterNewUser(password, username, email));
  }
}
