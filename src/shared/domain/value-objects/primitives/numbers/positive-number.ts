import { DomainErrors } from '../../util/domain-errors';
import { DomainErrorsProp } from '../../util/domain-errors-prop';

export class PositiveNumber {
  static ValidationError = class {
    static hasToBePositive = 'debe ser positivo';
  };

  static parse(
    val: number,
    errors: DomainErrors,
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
