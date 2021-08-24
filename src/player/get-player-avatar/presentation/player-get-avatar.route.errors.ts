import { ApiProperty } from '@nestjs/swagger';
import { GetPlayerAvatarErrors } from '../domain/value-object/get-player-avatar.errors';

export class PlayerGetAvatarRouteErrors implements GetPlayerAvatarErrors {
  @ApiProperty()
  userId: string[] = [];
}
