import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsString,
} from 'class-validator';

export class AdminMathTopicAddRouteBody {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  mathAreaId!: string;

  @ApiProperty({ type: [String] })
  @Transform((params) => params.value.split(','))
  @IsArray()
  @ArrayMaxSize(11)
  @ArrayMinSize(11)
  @ArrayUnique()
  enemyIds!: string[];

  @ApiProperty({ type: 'file' })
  image!: any;
}
