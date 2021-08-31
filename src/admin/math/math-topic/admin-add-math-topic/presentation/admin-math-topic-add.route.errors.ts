import { ApiProperty } from '@nestjs/swagger';
import { AdminAddMathTopicErrors } from '../domain/value-object/admin-add-math-topic.errors';

export class AdminMathTopicAddRouteErrors implements AdminAddMathTopicErrors {
  @ApiProperty()
  enemyIds!: string[];

  @ApiProperty()
  mathAreaId!: string[];

  @ApiProperty()
  userId!: string[];

  @ApiProperty()
  name!: string[];

  @ApiProperty()
  description!: string[];
}
