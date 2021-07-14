import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlayerSellEquipmentRouteParams {
  @ApiProperty()
  @IsString()
  equipmentId: string = '';
}
