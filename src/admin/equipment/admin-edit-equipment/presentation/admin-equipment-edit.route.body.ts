import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsOptional } from 'class-validator';

export class AdminEquipmentEditRouteBody {
  @ApiProperty({ type: 'file', required: false })
  image!: any;

  @ApiProperty({ type: String, required: false })
  name!: string | undefined;

  @ApiProperty({ type: String, required: false })
  description!: string | undefined;

  @ApiProperty({ type: Number, required: false })
  @Transform((params) => +params.value)
  buyPrice!: number | undefined;

  @ApiProperty({ type: Number, required: false })
  @Transform((params) => +params.value)
  attack!: number | undefined;

  @ApiProperty({ type: Number, required: false })
  @Transform((params) => +params.value)
  defense!: number | undefined;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBooleanString()
  isActive!: string | undefined;
}
