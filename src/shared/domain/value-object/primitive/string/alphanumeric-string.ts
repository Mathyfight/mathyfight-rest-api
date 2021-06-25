import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class AlphanumericString {
  static ValidationError = class {
    static hasToBeAlphanumeric = 'debe ser alfanumérico';
  };

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): AlphanumericString | null {
    const isAlphanumeric = /^\w+$/.test(val);
    if (!isAlphanumeric) {
      errors[prop]?.push(this.ValidationError.hasToBeAlphanumeric);
      return null;
    }

    return new AlphanumericString();
  }
}
