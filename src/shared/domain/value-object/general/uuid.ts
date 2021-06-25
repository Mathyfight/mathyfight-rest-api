import { DomainErrorsOld } from '../util/domain-errors-old';
import { DomainErrorsProp } from '../util/domain-errors';
import * as uuid from 'uuid';

export class Uuid {
  static ValidationError = class {
    static hasToBeAnUuid = 'debe tener el formato de un uuid v4';
  };

  private constructor(readonly val: string) {}

  static new(): Uuid {
    return new Uuid(uuid.v4());
  }

  static parse(
    value: string,
    errors: DomainErrorsOld,
    prop: DomainErrorsProp,
  ): Uuid | null {
    const isUuid = uuid.validate(value);
    if (!isUuid) {
      errors.add(this.ValidationError.hasToBeAnUuid, prop);
      return null;
    }

    return new Uuid(value);
  }

  static fromExisting(id: string): Uuid {
    return new Uuid(id);
  }
}
