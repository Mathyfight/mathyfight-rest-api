import { DomainErrors } from '../../util/domain-errors';
import { DomainErrorsProp } from '../../util/domain-errors-prop';

export class FiniteString {
  static ValidationError = class {
    static hasToBeThisLong = (min: number, max: number): string =>
      `debe tener entre ${min} hasta ${max} caracteres`;
  };

  static parse(
    val: string,
    min: number,
    max: number,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): FiniteString | null {
    const isInsideLength = val.length >= min && val.length <= max;
    if (!isInsideLength) {
      errors.add(this.ValidationError.hasToBeThisLong(min, max), prop);
      return null;
    }

    return new FiniteString();
  }
}
