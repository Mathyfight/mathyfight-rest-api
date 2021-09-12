import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class MathAnswerDescription {
  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): MathAnswerDescription | null {
    const valV = FiniteString.parse(val, 1, 10, errors, prop);

    if (valV === null) return null;

    return new MathAnswerDescription(valV.val);
  }
}
