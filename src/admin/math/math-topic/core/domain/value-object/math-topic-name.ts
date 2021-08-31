import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class MathTopicName {
  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): MathTopicName | null {
    const valV = FiniteString.parse(val, 5, 64, errors, prop);
    if (valV === null) return null;
    return new MathTopicName(valV.val);
  }
}
