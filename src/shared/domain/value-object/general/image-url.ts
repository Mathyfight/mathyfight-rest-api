import { FiniteString } from '../primitive/string/finite-string';
import { DomainErrors, DomainErrorsProp } from '../util/domain-errors';

export class ImageUrl {
  private constructor(readonly val: string) {}

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): ImageUrl | null {
    const valV = FiniteString.parse(val, 1, 2048, errors, prop);

    if (valV === null) return null;

    return new ImageUrl(valV.val);
  }
}
