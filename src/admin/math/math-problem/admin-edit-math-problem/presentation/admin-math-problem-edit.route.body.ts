import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class AdminMathProblemEditRouteBody {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  difficultyId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description!: string;

  @ApiProperty({ type: 'file', required: false })
  image!: any;

  @ApiProperty({ type: [String], required: false })
  @Transform((params) => params.value.split(','))
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique()
  mathAnswersId!: string[];

  @ApiProperty({ type: [String], required: false })
  @Transform((params) => params.value.split(','))
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique()
  mathAnswersDescription!: string[];

  @ApiProperty({ type: [Boolean], required: false })
  @Transform((params) =>
    params.value.split(',').map((c: string) => c === 'true'),
  )
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  mathAnswersIsCorrect!: boolean[];
}
