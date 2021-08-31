import { ApiProperty } from '@nestjs/swagger';
import { DeleteEnemyErrors } from '../domain/value-object/delete-enemy.errors';

export class EnemyDeleteRouteErrors implements DeleteEnemyErrors {
  @ApiProperty()
  enemyId: string[] = [];

  @ApiProperty()
  userId: string[] = [];
}
