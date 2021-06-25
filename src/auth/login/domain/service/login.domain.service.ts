import { Password } from 'src/auth/core/domain/value-object/password';
import { DomainErrorsOld } from 'src/shared/domain/value-object/util/domain-errors-old';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { User } from '../entity/user';
import * as bcrypt from 'bcrypt';

export class LoginDomainService {
  readonly invalidCredentials = 'nombre de usuario o contraseña incorrecta';

  validateExistingUser(foundUser: User | null, errors: DomainErrorsOld): void {
    const existingUser = foundUser !== null;
    if (!existingUser) {
      errors.add(this.invalidCredentials, DomainErrorsProp.errors);
    }
  }

  async validateMatchingPasswords(
    requestPassword: Password,
    foundUser: User | null,
    errors: DomainErrorsOld,
  ): Promise<void> {
    if (foundUser !== null) {
      const passwordsMatch = await bcrypt.compare(
        requestPassword.val,
        foundUser.hashedPassword.val,
      );
      if (!passwordsMatch) {
        errors.add(this.invalidCredentials, DomainErrorsProp.errors);
      }
    }
  }
}
