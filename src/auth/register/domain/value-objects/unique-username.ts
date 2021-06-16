import { Username } from 'src/auth/core/domain/value-objects/username';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';
import { RegisterRepository } from '../adapters/register.repository';

export class UniqueUsername {
  static ValidationError = class {
    static exists = 'debe ingresar uno no registrado en el sistema';
  };

  private constructor(readonly username: Username) {}

  get val(): string {
    return this.username.val;
  }

  static parse(
    username: Username,
    repository: RegisterRepository,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): UniqueUsername | null {
    const userId = repository.getOneUserIdByUsername(username);
    const exists = userId !== null;
    if (exists) {
      errors.add(this.ValidationError.exists, prop);
      return null;
    }
    return new UniqueUsername(username);
  }

  static fromExisting(username: string): UniqueUsername {
    return new UniqueUsername(Username.fromExisting(username));
  }
}
