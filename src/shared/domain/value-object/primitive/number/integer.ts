import { DomainErrors } from '../../util/domain-errors';
import { DomainErrorsProp } from '../../util/domain-errors-prop';

export class Integer {
  static ValidationError = class {
    static hasToBeAnInteger = 'debe ser un entero';
  };

  static parse(
    val: number,
    errors: DomainErrors,
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
