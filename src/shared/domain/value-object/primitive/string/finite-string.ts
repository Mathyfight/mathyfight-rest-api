import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class FiniteString {
  static ValidationError = class {
    static hasToBeThisLong = (min: number, max: number): string =>
      `debe tener entre ${min} hasta ${max} caracteres`;
  };

  static parse(
    val: string,
    min: number,
    max: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): FiniteString | null {
    const isInsideLength = val.length >= min && val.length <= max;
    if (!isInsideLength) {
      errors[prop]?.push(this.ValidationError.hasToBeThisLong(min, max));
      return null;
    }

    return new FiniteString();
  }
}
