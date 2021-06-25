import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class Integer {
  static ValidationError = class {
    static hasToBeAnInteger = 'debe ser un entero';
  };

  static parse(
    val: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Integer | null {
    const isInteger = Number.isInteger(val);
    if (!isInteger) {
      errors[prop]?.push(this.ValidationError.hasToBeAnInteger, prop);
      return null;
    }

    return new Integer();
  }
}
