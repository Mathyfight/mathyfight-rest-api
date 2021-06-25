import { DomainErrorsOld } from '../../util/domain-errors-old';
import { DomainErrorsProp } from '../../util/domain-errors';

export class Integer {
  static ValidationError = class {
    static hasToBeAnInteger = 'debe ser un entero';
  };

  static parse(
    val: number,
    errors: DomainErrorsOld,
    prop: DomainErrorsProp,
  ): Integer | null {
    const isInteger = Number.isInteger(val);
    if (!isInteger) {
      errors.add(this.ValidationError.hasToBeAnInteger, prop);
      return null;
    }

    return new Integer();
  }
}
