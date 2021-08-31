import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';

export class AdminEquipmentsGetRouteQueries {
  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  readonly equipmentType!: EquipmentType;
}
