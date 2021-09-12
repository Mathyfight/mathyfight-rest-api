import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsString,
} from 'class-validator';

export class AdminMathProblemAddRouteBody {
  @ApiProperty()
  @IsString()
  difficultyId!: string;

  @ApiProperty()
  @IsString()
  mathTopicId!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: 'file' })
  image!: any;

  @ApiProperty({ type: [String] })
  @Transform((params) => params.value.split(','))
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(2)
  @ArrayUnique()
  mathAnswersDescription!: string[];

  @ApiProperty({ type: [Boolean] })
  @Transform((params) =>
    params.value.split(',').map((c: string) => c === 'true'),
  )
  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(2)
  mathAnswersIsCorrect!: boolean[];
}
