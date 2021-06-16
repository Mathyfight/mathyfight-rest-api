import { DomainErrors } from '../util/domain-errors';
import { DomainErrorsProp } from '../util/domain-errors-prop';
import { FiniteString } from '../primitives/strings/finite-string';
import { AlphanumericString } from '../primitives/strings/alphanumeric-string';

export class Username {
  private constructor(private _val: string) {}

  static minLength = 3;
  static maxLength = 32;

  static parse(
    val: string,
    errors: DomainErrors,
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
