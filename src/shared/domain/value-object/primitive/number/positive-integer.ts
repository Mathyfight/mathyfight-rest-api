import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';
import { Integer } from './integer';
import { PositiveNumber } from './positive-number';

export class PositiveInteger {
  private constructor(readonly val: number) {}

  static parse(
    value: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): PositiveInteger | null {
    const isPositiveNumber = PositiveNumber.parse(value, errors, prop) !== null;

    const isInteger = Integer.parse(value, errors, prop) !== null;

    if (!(isPositiveNumber && isInteger)) return null;

    return new PositiveInteger(value);
  }
}
