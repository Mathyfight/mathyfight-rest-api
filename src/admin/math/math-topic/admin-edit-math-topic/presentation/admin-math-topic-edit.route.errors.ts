import { ApiProperty } from '@nestjs/swagger';
import { AdminEditMathTopicErrors } from '../domain/value-object/admin-edit-math-topic.errors';

export class AdminMathTopicEditRouteErrors implements AdminEditMathTopicErrors {
  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  mathTopicId!: string[];

  @ApiProperty()
  name!: string[];

  @ApiProperty()
  description!: string[];

  @ApiProperty()
  mathAreaId!: string[];

  @ApiProperty()
  enemyIds!: string[];

  @ApiProperty()
  image!: string[];

  @ApiProperty()
  errors!: string[];
}
