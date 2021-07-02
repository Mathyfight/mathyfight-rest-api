import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { EquipmentSortingOrder } from '../domain/value-object/equipment-sorting-order';

export class PlayerGetEquipmentsRouteQueries {
  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  readonly type: EquipmentType;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty({ enum: EquipmentSortingOrder, required: false })
  @IsOptional()
  @IsEnum(EquipmentSortingOrder)
  readonly order?: EquipmentSortingOrder;

  @ApiProperty({ enum: SortingOrderCriteria, required: false })
  @IsOptional()
  @IsEnum(SortingOrderCriteria)
  readonly orderCriteria?: SortingOrderCriteria;

  constructor(type: EquipmentType, page: number) {
    this.type = type;
    this.page = page;
  }
}