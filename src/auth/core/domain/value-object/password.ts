import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class Password {
  private constructor(readonly val: string) {}

  static readonly minLength = 8;
  static readonly maxLength = 32;

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Password | null {
    const isInsideLength =
      FiniteString.parse(val, this.minLength, this.maxLength, errors, prop) !==
      null;

    if (!isInsideLength) return null;

    return new Password(val);
  }
}
