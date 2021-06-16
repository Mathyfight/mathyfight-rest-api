import { AlphanumericString } from 'src/shared/domain/value-objects/primitives/strings/alphanumeric-string';
import { FiniteString } from 'src/shared/domain/value-objects/primitives/strings/finite-string';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';

export class Username {
  private constructor(readonly val: string) {}

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
