import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsAppServiceResponse } from '../application/service/get-equipments.app.service.response';

export class GetEquipmentsEquipmentRouteResponse {
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
  readonly buyPrice: number;

  @ApiProperty()
  readonly level: number;

  constructor(
    id: string,
    name: string,
    attack: number,
    defense: number,
    imageUrl: string,
    description: string,
    buyPrice: number,
    level: number,
  ) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.imageUrl = imageUrl;
    this.description = description;
    this.buyPrice = buyPrice;
    this.level = level;
  }
}

export class GetEquipmentsRouteResponse {
  @ApiProperty({ type: Number, nullable: true })
  readonly nextPage: number | null;

  @ApiProperty({
    type: GetEquipmentsEquipmentRouteResponse,
    isArray: true,
    maxItems: 10,
  })
  readonly equipments: GetEquipmentsEquipmentRouteResponse[];

  constructor(
    nextPage: number | null,
    equipments: GetEquipmentsEquipmentRouteResponse[],
  ) {
    this.nextPage = nextPage;
    this.equipments = equipments;
  }

  static fromServiceResponse(
    response: GetEquipmentsAppServiceResponse,
  ): GetEquipmentsRouteResponse {
    return new GetEquipmentsRouteResponse(
      response.nextPage,
      response.equipments.map(
        (e) =>
          new GetEquipmentsEquipmentRouteResponse(
            e.id,
            e.name,
            e.attack,
            e.defense,
            e.imageUrl,
            e.description,
            e.buyPrice,
            e.level,
          ),
      ),
    );
  }
}
