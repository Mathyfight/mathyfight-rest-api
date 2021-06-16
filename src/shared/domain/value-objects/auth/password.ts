import { FiniteString } from '../primitives/strings/finite-string';
import { DomainErrors } from '../util/domain-errors';
import { DomainErrorsProp } from '../util/domain-errors-prop';

export class Password {
  private constructor(private _val: string) {}

  static minLength = 8;
  static maxLength = 32;

  static parse(
    val: string,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): Password | null {
    const isInsideLength =
      FiniteString.parse(val, this.minLength, this.maxLength, errors, prop) !==
      null;

    if (!isInsideLength) return null;

    return new Password(val);
  }
}
