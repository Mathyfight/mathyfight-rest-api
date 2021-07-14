import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class BuyEquipmentErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  equipmentId: string[] = [];
  errors: string[] = [];
}
