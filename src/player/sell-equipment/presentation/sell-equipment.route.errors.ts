import { ApiProperty } from '@nestjs/swagger';
import { SellEquipmentErrors } from '../domain/value-object/sell-equipment.errors';

export class SellEquipmentRouteErrors implements SellEquipmentErrors {
  @ApiProperty()
  avatarEquipmentId: string[];

  constructor() {
    this.avatarEquipmentId = [];
  }
}
