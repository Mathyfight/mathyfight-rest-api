import { DomainErrors } from '../../util/domain-errors';
import { DomainErrorsProp } from '../../util/domain-errors-prop';

export class AlphanumericString {
  static ValidationError = class {
    static hasToBeAlphanumeric = 'debe ser alfanumérico';
  };

  static parse(
    val: string,
    errors: DomainErrors,
    prop: DomainErrorsProp,
  ): AlphanumericString | null {
    const isAlphanumeric = /\/^\w+$\//.test(val);
    if (!isAlphanumeric) {
      errors.add(this.ValidationError.hasToBeAlphanumeric, prop);
      return null;
    }

    return new AlphanumericString();
  }
}
