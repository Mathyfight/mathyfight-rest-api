import { ApiProperty } from '@nestjs/swagger';
import { UpdatePlayerAvatarErrors } from '../domain/value-object/update-player-avatar.errors';

export class PlayerUpdateAvatarRouteErrors implements UpdatePlayerAvatarErrors {
  @ApiProperty()
  userId: string[] = [];

  @ApiProperty()
  color: string[] = [];

  @ApiProperty()
  raceId: string[] = [];

  @ApiProperty()
  errors: string[] = [];
}
