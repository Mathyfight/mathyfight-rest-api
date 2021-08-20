import { ApiProperty } from '@nestjs/swagger';
import { SearchPlayerInteractorResponse } from '../adapter/interactor/search-player.interactor.response';

export class PlayerSearchRouteResponse {
  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly color: string;

  @ApiProperty({ type: String })
  readonly helmetImageUrl: string | null;

  @ApiProperty({ type: String })
  readonly chestplateImageUrl: string | null;

  @ApiProperty({ type: String })
  readonly leggingsImageUrl: string | null;

  @ApiProperty({ type: String })
  readonly bootsImageUrl: string | null;

  @ApiProperty({ type: String })
  readonly weaponImageUrl: string | null;

  @ApiProperty({ type: String })
  readonly shieldImageUrl: string | null;

  constructor(intRes: SearchPlayerInteractorResponse) {
    this.userId = intRes.userId;
    this.username = intRes.username;
    this.imageUrl = intRes.imageUrl;
    this.color = intRes.color;
    this.helmetImageUrl = intRes.helmetImageUrl;
    this.chestplateImageUrl = intRes.chestplateImageUrl;
    this.leggingsImageUrl = intRes.leggingsImageUrl;
    this.bootsImageUrl = intRes.bootsImageUrl;
    this.weaponImageUrl = intRes.weaponImageUrl;
    this.shieldImageUrl = intRes.shieldImageUrl;
  }
}
