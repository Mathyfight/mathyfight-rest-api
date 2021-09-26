import { ApiProperty } from '@nestjs/swagger';
import { AdminGetEquipmentsInteractorResponse } from '../adapter/interactor/admin-get-equipments.interactor.response';

export class AdminEquipmentsGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly sellPrice: number;

  @ApiProperty()
  readonly buyPrice: number;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  @ApiProperty()
  readonly isActive: boolean;

  constructor(intRes: AdminGetEquipmentsInteractorResponse) {
    this.attack = intRes.attack;
    this.buyPrice = intRes.buyPrice;
    this.defense = intRes.defense;
    this.description = intRes.description;
    this.id = intRes.id;
    this.imageUrl = intRes.imageUrl;
    this.name = intRes.name;
    this.sellPrice = intRes.sellPrice;
    this.isActive = intRes.isActive;
  }
}
