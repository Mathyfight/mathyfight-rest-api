import { ApiProperty } from '@nestjs/swagger';
import { AddEnemyErrors } from '../domain/value-object/add-enemy.errors';

export class AdminEnemyAddRouteErrors implements AddEnemyErrors {
  @ApiProperty()
  name: string[] = [];

  @ApiProperty()
  image: string[] = [];

  @ApiProperty()
  userId: string[] = [];
}
