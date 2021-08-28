import { ApiProperty } from '@nestjs/swagger';
import { StartAttackErrors } from '../domain/value-object/start-attack.errors';

export class StartAttackRouteErrors implements StartAttackErrors {
  @ApiProperty()
  battleId: string[] = [];

  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  difficultyId: string[] = [];
}
