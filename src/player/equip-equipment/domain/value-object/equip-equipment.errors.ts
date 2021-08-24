import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class EquipEquipmentErrors implements Partial<DomainErrors> {
  equipmentId: string[] = [];
  userId: string[] = [];
  errors: string[] = [];
}
