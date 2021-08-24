import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';

export class PlayerEquipEquipmentRouteBody {
  @ApiProperty({ type: String })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly equipmentId: string | null;

  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  readonly type: EquipmentType;

  constructor(equipmentId: string, type: EquipmentType) {
    this.equipmentId = equipmentId;
    this.type = type;
  }
}
