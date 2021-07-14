import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class AlphanumericString {
  static isNotAlphanumeric = 'debe ser alfanumérico';

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): AlphanumericString | null {
    const isAlphanumeric = /^\w+$/.test(val);
    if (!isAlphanumeric) {
      errors[prop]?.push(this.isNotAlphanumeric);
      return null;
    }

    return new AlphanumericString();
  }
}
