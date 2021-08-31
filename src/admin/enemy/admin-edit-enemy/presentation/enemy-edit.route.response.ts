import { ApiProperty } from '@nestjs/swagger';

export class EnemyEditRouteResponse {
  @ApiProperty({ type: String })
  readonly imageUrl: string | null;

  constructor(imageUrl?: string) {
    this.imageUrl = imageUrl === undefined ? null : imageUrl;
  }
}
