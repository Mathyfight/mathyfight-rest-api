import { ApiProperty } from '@nestjs/swagger';
import { TryAttackErrors } from '../domain/value-object/try-attack.errors';

export class BattleTryAttackRouteErrors implements TryAttackErrors {
  @ApiProperty()
  battleId: string[] = [];

  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  answerId: string[] = [];
}
