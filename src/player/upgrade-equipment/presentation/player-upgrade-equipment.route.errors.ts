import { ApiProperty } from '@nestjs/swagger';
import { UpgradeEquipmentErrors } from '../domain/value-object/upgrade-equipment.errors';

export class PlayerUpgradeEquipmentRouteErrors
  implements UpgradeEquipmentErrors
{
  @ApiProperty()
  avatarEquipmentId: string[];

  constructor() {
    this.avatarEquipmentId = [];
  }
}
