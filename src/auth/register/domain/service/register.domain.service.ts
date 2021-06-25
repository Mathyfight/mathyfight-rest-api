import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { DomainErrorsOld } from 'src/shared/domain/value-object/util/domain-errors-old';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';

export class RegisterDomainService {
  readonly hasToBeUnique = 'debe no haber sido registrado antes';

  validateUniqueUsername(
    userIdFromUsername: Uuid | null,
    errors: DomainErrorsOld,
  ): void {
    const usernameExists = userIdFromUsername !== null;
    if (usernameExists) {
      errors.add(this.hasToBeUnique, DomainErrorsProp.username);
    }
  }

  validateUniqueEmail(
    userIdFromEmail: Uuid | null,
    errors: DomainErrorsOld,
  ): void {
    const emailExists = userIdFromEmail !== null;
    if (emailExists) {
      errors.add(this.hasToBeUnique, DomainErrorsProp.email);
    }
  }
}
