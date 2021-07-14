import { HashedPassword } from '../../../core/domain/value-object/hashed-password';
import { User } from '../entity/user';
import { LoginErrors } from '../value-object/login.errors';
import { GenerateJwt } from './generate.jwt';

export class LoginCommand {
  static readonly invalidCredentials =
    'nombre de usuario o contraseña incorrecta';

  private constructor(readonly generateJwt: GenerateJwt) {}

  static new(
    user: User | null,
    password: string,
    errors: LoginErrors,
  ): LoginCommand | null {
    if (user === null) {
      errors.errors.push(this.invalidCredentials);
      return null;
    }

    if (!HashedPassword.passwordsMatch(user.hashedPassword, password)) {
      errors.errors.push(this.invalidCredentials);
      return null;
    }

    return new LoginCommand(new GenerateJwt(user.id));
  }
}
