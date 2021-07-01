import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentsAppServiceResponse } from '../application/service/get-equipments.app.service.response';

export class PlayerGetEquipmentsEquipmentUpgradeRouteResponse {
  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  improvedAttack: number;

  @ApiProperty()
  improvedDefense: number;

  constructor(price: number, improvedAttack: number, improvedDefense: number) {
    this.price = price;
    this.improvedAttack = improvedAttack;
    this.improvedDefense = improvedDefense;
  }
}

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
  readonly level: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly sellPrice: number;

  @ApiProperty({ type: PlayerGetEquipmentsEquipmentUpgradeRouteResponse })
  readonly upgrade: PlayerGetEquipmentsEquipmentUpgradeRouteResponse | null;

  constructor(
    id: string,
    name: string,
    attack: number,
    defense: number,
    imageUrl: string,
    description: string,
    sellPrice: number,
    level: number,
    upgrade: PlayerGetEquipmentsEquipmentUpgradeRouteResponse | null,
  ) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.imageUrl = imageUrl;
    this.description = description;
    this.sellPrice = sellPrice;
    this.level = level;
    this.upgrade = upgrade;
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
    response: GetEquipmentsAppServiceResponse,
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
            e.level,
            e.upgrade === null
              ? null
              : new PlayerGetEquipmentsEquipmentUpgradeRouteResponse(
                  e.upgrade.price,
                  e.upgrade.improvedAttack,
                  e.upgrade.improvedDefense,
                ),
          ),
      ),
    );
  }
}
