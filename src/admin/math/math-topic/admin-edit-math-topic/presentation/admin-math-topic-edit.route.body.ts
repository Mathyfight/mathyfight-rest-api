import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class AdminMathTopicEditRouteBody {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mathAreaId?: string;

  @ApiProperty({ type: [String], required: false })
  @Transform((params) => params.value.split(','))
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(11)
  @ArrayMinSize(11)
  @ArrayUnique()
  enemyIds?: string[];

  @ApiProperty({ type: 'file', required: false })
  @IsOptional()
  image?: any;
}
