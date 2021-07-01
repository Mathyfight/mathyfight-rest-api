import { ApiProperty } from '@nestjs/swagger';
import { BuyEquipmentErrors } from '../domain/value-object/buy-equipment.errors';

export class StoreBuyEquipmentRouteErrors implements BuyEquipmentErrors {
  @ApiProperty()
  userId: string[];

  @ApiProperty()
  equipmentId: string[];

  @ApiProperty()
  errors: string[];

  constructor() {
    this.userId = [];
    this.equipmentId = [];
    this.errors = [];
  }
}
