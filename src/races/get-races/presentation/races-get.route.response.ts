import { ApiProperty } from '@nestjs/swagger';

export class RacesGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly gender: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(id: string, name: string, gender: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.imageUrl = imageUrl;
  }
}
