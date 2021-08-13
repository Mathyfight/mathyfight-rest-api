import { AlphanumericString } from 'src/shared/domain/value-object/primitive/string/alphanumeric-string';
import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class Username {
  private constructor(readonly val: string) {}

  static readonly minLength = 3;
  static readonly maxLength = 20;

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Username | null {
    const isInsideLength =
      FiniteString.parse(val, this.minLength, this.maxLength, errors, prop) !==
      null;

    const isAlphanumeric = AlphanumericString.parse(val, errors, prop) !== null;

    if (!(isInsideLength && isAlphanumeric)) return null;

    return new Username(val);
  }
}
