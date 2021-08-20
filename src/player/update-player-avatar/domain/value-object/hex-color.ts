import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class HexColor {
  private constructor(readonly val: string) {}

  static readonly isNotHexFormat =
    'debe tener el formato de un color hexadecimal';

  static parse(
    val: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): HexColor | null {
    const regex = /^[0-9A-F]{6}$/i;
    if (!regex.test(val)) {
      errors[prop]?.push(this.isNotHexFormat);
      return null;
    }
    return new HexColor(val.toUpperCase());
  }
}
