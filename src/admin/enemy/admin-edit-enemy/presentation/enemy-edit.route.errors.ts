import { ApiProperty } from '@nestjs/swagger';
import { EditEnemyErrors } from '../domain/value-object/edit-enemy.errors';

export class AdminEnemyEditRouteErrors implements EditEnemyErrors {
  @ApiProperty()
  name: string[] = [];

  @ApiProperty()
  image: string[] = [];

  @ApiProperty()
  userId: string[] = [];
}
