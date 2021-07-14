import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class PositiveNumber {
  static isNotPositive = 'debe ser positivo';

  static parse(
    val: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): PositiveNumber | null {
    const isPositive = val > 0;
    if (!isPositive) {
      errors[prop]?.push(this.isNotPositive);
      return null;
    }

    return new PositiveNumber();
  }
}
