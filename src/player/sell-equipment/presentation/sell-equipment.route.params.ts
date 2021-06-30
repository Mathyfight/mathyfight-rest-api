import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SellEquipmentRouteParams {
  @ApiProperty()
  @IsString()
  equipmentId: string;

  constructor(equipmentId: string) {
    this.equipmentId = equipmentId;
  }
}
