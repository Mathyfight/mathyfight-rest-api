import { DomainErrors, DomainErrorsProp } from '../util/domain-errors';
import * as uuid from 'uuid';

export class Uuid {
  static readonly isNotAUuid = 'debe tener el formato de un uuid v4';

  private constructor(readonly val: string) {}

  static new(): Uuid {
    return new Uuid(uuid.v4());
  }

  static parse(
    value: string,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): Uuid | null {
    const isUuid = uuid.validate(value);
    if (!isUuid) {
      errors[prop]?.push(this.isNotAUuid);
      return null;
    }

    return new Uuid(value);
  }

  static isValid(uuidStr: string): boolean {
    return uuid.validate(uuidStr);
  }

  static newPrimitive(): string {
    return uuid.v4();
  }
}
