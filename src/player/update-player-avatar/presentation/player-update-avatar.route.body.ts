import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

export class PlayerUpdateAvatarRouteBody {
  @ApiProperty({ type: String })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly raceId: string | null;

  @ApiProperty({ type: String })
  readonly color: string | null;

  constructor(raceId: string | null, color: string | null) {
    this.raceId = raceId;
    this.color = color;
  }
}
