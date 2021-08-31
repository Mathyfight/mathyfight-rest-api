import { ApiProperty } from '@nestjs/swagger';
import { AdminAddEquipmentErrors } from '../domain/value-object/admin-add-equipment.errors';

export class AdminEquipmentAddRouteErrors implements AdminAddEquipmentErrors {
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
