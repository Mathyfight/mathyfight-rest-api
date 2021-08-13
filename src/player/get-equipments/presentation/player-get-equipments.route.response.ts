import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsInteractorResponse } from '../adapter/interactor/get-equipments.interactor.response';

export class PlayerGetEquipmentsEquipmentRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly sellPrice: number;

  constructor(
    id: string,
    name: string,
    attack: number,
    defense: number,
    imageUrl: string,
    description: string,
    sellPrice: number,
  ) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.imageUrl = imageUrl;
    this.description = description;
    this.sellPrice = sellPrice;
  }
}

export class PlayerGetEquipmentsRouteResponse {
  @ApiProperty({ type: Number, nullable: true })
  readonly nextPage: number | null;

  @ApiProperty({
    type: PlayerGetEquipmentsEquipmentRouteResponse,
    isArray: true,
    maxItems: 20,
  })
  readonly equipments: PlayerGetEquipmentsEquipmentRouteResponse[];

  constructor(
    nextPage: number | null,
    equipments: PlayerGetEquipmentsEquipmentRouteResponse[],
  ) {
    this.nextPage = nextPage;
    this.equipments = equipments;
  }

  static fromServiceResponse(
    response: GetEquipmentsInteractorResponse,
  ): PlayerGetEquipmentsRouteResponse {
    return new PlayerGetEquipmentsRouteResponse(
      response.nextPage,
      response.equipments.map(
        (e) =>
          new PlayerGetEquipmentsEquipmentRouteResponse(
            e.id,
            e.name,
            e.attack,
            e.defense,
            e.imageUrl,
            e.description,
            e.sellPrice,
          ),
      ),
    );
  }
}
