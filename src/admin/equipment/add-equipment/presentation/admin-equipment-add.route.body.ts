import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';

export class AdminEquipmentAddRouteBody {
  @ApiProperty({ type: 'file' })
  image!: any;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @Transform((params) => +params.value)
  buyPrice!: number;

  @ApiProperty()
  @Transform((params) => +params.value)
  attack!: number;

  @ApiProperty()
  @Transform((params) => +params.value)
  defense!: number;

  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  equipmentType!: EquipmentType;
}
