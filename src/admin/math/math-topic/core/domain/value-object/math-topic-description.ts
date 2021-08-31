import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class MathTopicDescription {
  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): MathTopicDescription | null {
    const valV = FiniteString.parse(val, 5, 200, errors, prop);
    if (valV === null) return null;
    return new MathTopicDescription(valV.val);
  }
}
