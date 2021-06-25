import { User } from '../entity/user';
import * as bcrypt from 'bcrypt';
import { LoginCommand } from '../command/login.command';
import { GenerateJwt } from '../command/generate-jwt';
import { LoginErrors } from '../value-object/login.errors';

export class LoginDomainService {
  readonly invalidCredentials = 'nombre de usuario o contraseña incorrecta';

  async invoke(
    user: User | null,
    password: string,
    errors: LoginErrors,
  ): Promise<LoginCommand | null> {
    if (user === null) {
      errors.errors.push(this.invalidCredentials);
      return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordsMatch) {
      errors.errors.push(this.invalidCredentials);
      return null;
    }

    return new LoginCommand(new GenerateJwt(user.id));
  }
}
