import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';

export class UpgradeEquipmentErrors implements Partial<DomainErrors> {
  avatarEquipmentId: string[];

  constructor() {
    this.avatarEquipmentId = [];
  }
}
