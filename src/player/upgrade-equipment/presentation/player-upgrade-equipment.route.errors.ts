import { ApiProperty } from '@nestjs/swagger';
import { UpgradeEquipmentErrors } from '../domain/value-object/upgrade-equipment.errors';

export class PlayerUpgradeEquipmentRouteErrors
  implements UpgradeEquipmentErrors
{
  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  avatarEquipmentId: string[] = [];

  @ApiProperty()
  errors: string[] = [];
}
