import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminEditEquipmentErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  equipmentId: string[] = [];
  image: string[] = [];
  name: string[] = [];
  description: string[] = [];
  buyPrice: string[] = [];
  attack: string[] = [];
  defense: string[] = [];
  errors: string[] = [];
}
