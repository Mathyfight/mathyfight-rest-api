import { Email } from 'src/auth/core/domain/value-objects/email';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';
import { RegisterRepository } from '../adapters/register.repository';

export class NonExistingEmail {
  static ValidationError = class {
    static exists = 'debe ingresar uno no registrado en el sistema';
  };

  private constructor(readonly email: Email) {}

  static parse(
    email: Email,
    repository: RegisterRepository,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): NonExistingEmail | null {
    const userId = repository.getOneUserIdByEmail(email);
    const exists = userId === null;
    if (exists) {
      errors.add(this.ValidationError.exists, prop);
      return null;
    }
    return new NonExistingEmail(email);
  }
}
