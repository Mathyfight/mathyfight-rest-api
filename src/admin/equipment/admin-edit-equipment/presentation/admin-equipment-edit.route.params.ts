import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminEquipmentEditRouteParams {
  @ApiProperty()
  @IsString()
  equipmentId!: string;
}
