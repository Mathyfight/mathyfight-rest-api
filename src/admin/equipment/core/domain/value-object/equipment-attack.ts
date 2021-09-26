import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import {
  DomainErrors,
  DomainErrorsProp,
} from 'src/shared/domain/value-object/util/domain-errors';

export class EquipmentAttack {
  private constructor(readonly val: number) {}

  static maxVal = 92;

  static parse(
    val: number,
    errors: Partial<DomainErrors>,
    prop: DomainErrorsProp,
  ): EquipmentAttack | null {
    const valV = PositiveInteger.parse(val, errors, DomainErrorsProp.buyPrice);
    if (val > this.maxVal) {
      errors[prop]?.push(`debe ser menor o igual a ${this.maxVal}`);
      return null;
    }
    if (valV === null) return null;
    return new EquipmentAttack(valV.val);
  }
}
