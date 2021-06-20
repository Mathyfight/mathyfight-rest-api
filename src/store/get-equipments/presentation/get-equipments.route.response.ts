import { GetEquipmentsAppServiceResponse } from '../application/service/get-equipments.app.service.response';

export class GetEquipmentsRouteResponse {
  constructor(
    readonly nextPage: number | null,
    readonly equipments: GetEquipmentsEquipmentRouteResponse[],
  ) {}

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
          ),
      ),
    );
  }
}

export class GetEquipmentsEquipmentRouteResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly attack: number,
    readonly defense: number,
    readonly imageUrl: string,
    readonly description: string,
    readonly buyPrice: number,
  ) {}

  get level(): number {
    return 1;
  }
}
