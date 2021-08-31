import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class AdminAddEquipmentErrors implements Partial<DomainErrors> {
  userId: string[] = [];
  image: string[] = [];
  name: string[] = [];
  description: string[] = [];
  buyPrice: string[] = [];
  attack: string[] = [];
  defense: string[] = [];
}
