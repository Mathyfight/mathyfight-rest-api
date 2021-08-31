import { DomainErrors, DomainErrorsProp } from '../../util/domain-errors';

export class Integer {
  private constructor(readonly val: number) {}

  static readonly isNotAnInteger = 'debe ser un entero';

  static parse(
    val: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Integer | null {
    const isInteger = Number.isInteger(val);
    if (!isInteger) {
      errors[prop]?.push(this.isNotAnInteger);
      return null;
    }

    return new Integer(val);
  }
}
