import { ApiProperty } from '@nestjs/swagger';
import { GetPlayerStatisticsErrors } from '../domain/value-object/get-player-statistics.errors';

export class PlayerGetStatisticsRouteErrors
  implements GetPlayerStatisticsErrors
{
  @ApiProperty()
  readonly userId: string[] = [];
}
