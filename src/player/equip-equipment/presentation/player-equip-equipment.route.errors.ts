import { ApiProperty } from '@nestjs/swagger';
import { EquipEquipmentErrors } from '../domain/value-object/equip-equipment.errors';

export class PlayerEquipEquipmentRouteErrors implements EquipEquipmentErrors {
  @ApiProperty()
  equipmentId: string[] = [];

  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  errors: string[] = [];
}
