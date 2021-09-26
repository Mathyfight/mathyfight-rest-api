import { FiniteString } from 'src/shared/domain/value-object/primitive/string/finite-string';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class EnemyName {
  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): EnemyName | null {
    const valV = FiniteString.parse(val, 3, 25, errors, prop);

    if (valV === null) return null;

    return new EnemyName(valV.val);
  }
}
