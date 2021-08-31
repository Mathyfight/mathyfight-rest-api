import { ApiProperty } from '@nestjs/swagger';
import { AdminEditEquipmentErrors } from '../domain/value-object/admin-edit-equipment.errors';

export class AdminEquipmentEditRouteErrors implements AdminEditEquipmentErrors {
  @ApiProperty()
  equipmentId!: string[];

  @ApiProperty()
  errors!: string[];

  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  image!: string[];

  @ApiProperty()
  name!: string[];

  @ApiProperty()
  description!: string[];

  @ApiProperty()
  buyPrice!: string[];

  @ApiProperty()
  attack!: string[];

  @ApiProperty()
  defense!: string[];
}
