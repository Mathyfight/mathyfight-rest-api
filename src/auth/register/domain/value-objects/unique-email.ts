import { Email } from 'src/auth/core/domain/value-objects/email';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';
import { RegisterRepository } from '../adapters/register.repository';

export class UniqueEmail {
  static ValidationError = class {
    static exists = 'debe ingresar uno no registrado en el sistema';
  };

  private constructor(readonly email: Email) {}

  get val(): string {
    return this.email.val;
  }

  static async parse(
    email: Email,
    repository: RegisterRepository,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): Promise<UniqueEmail | null> {
    const userId = await repository.getOneUserIdByEmail(email);
    const exists = userId !== null;
    if (exists) {
      errors.add(this.ValidationError.exists, prop);
      return null;
    }
    return new UniqueEmail(email);
  }

  static fromExisting(email: string): UniqueEmail {
    return new UniqueEmail(Email.fromExisting(email));
  }
}
