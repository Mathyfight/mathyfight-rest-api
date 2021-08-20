import { ApiProperty } from '@nestjs/swagger';
import { GetPlayerProfileErrors } from '../domain/value-object/get-player-profile.errors';

export class PlayerGetProfileRouteErrors implements GetPlayerProfileErrors {
  @ApiProperty()
  userId: string[] = [];
}
