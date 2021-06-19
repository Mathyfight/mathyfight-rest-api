import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';

export class RegisterDomainService {
  readonly hasToBeUnique = 'debe no haber sido registrado antes';

  validateUniqueUsername(
    userIdFromUsername: Uuid | null,
    errors: DomainErrors,
  ): void {
    const usernameExists = userIdFromUsername !== null;
    if (usernameExists) {
      errors.add(this.hasToBeUnique, DomainErrorsProp.username);
    }
  }

  validateUniqueEmail(
    userIdFromEmail: Uuid | null,
    errors: DomainErrors,
  ): void {
    const emailExists = userIdFromEmail !== null;
    if (emailExists) {
      errors.add(this.hasToBeUnique, DomainErrorsProp.email);
    }
  }
}
