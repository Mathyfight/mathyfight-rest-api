import { DomainErrorsOld } from '../../util/domain-errors-old';
import { DomainErrorsProp } from '../../util/domain-errors';

export class PositiveNumber {
  static ValidationError = class {
    static hasToBePositive = 'debe ser positivo';
  };

  static parse(
    val: number,
    errors: DomainErrorsOld,
    prop: DomainErrorsProp,
  ): PositiveNumber | null {
    const isPositive = val > 0;
    if (!isPositive) {
      errors.add(this.ValidationError.hasToBePositive, prop);
      return null;
    }

    return new PositiveNumber();
  }
}
