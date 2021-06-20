import { Password } from 'src/auth/core/domain/value-object/password';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';
import { User } from '../entity/user';
import * as bcrypt from 'bcrypt';

export class LoginDomainService {
  readonly invalidCredentials = 'nombre de usuario o contraseña incorrecta';

  validateExistingUser(foundUser: User | null, errors: DomainErrors): void {
    const existingUser = foundUser !== null;
    if (!existingUser) {
      errors.add(this.invalidCredentials, DomainErrorsProp.errors);
    }
  }

  async validateMatchingPasswords(
    requestPassword: Password,
    foundUser: User | null,
    errors: DomainErrors,
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
