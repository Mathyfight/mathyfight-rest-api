import { DomainErrors } from '../../util/domain-errors';
import { DomainErrorsProp } from '../../util/domain-errors-prop';
import { Integer } from './integer';
import { PositiveNumber } from './positive-number';

export class PositiveInteger {
  private constructor(readonly val: number) {}

  static parse(
    value: number,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): PositiveInteger | null {
    const isPositiveNumber = PositiveNumber.parse(value, errors, prop) !== null;

    const isInteger = Integer.parse(value, errors, prop) !== null;

    if (!(isPositiveNumber && isInteger)) return null;

    return new PositiveInteger(value);
  }
}
