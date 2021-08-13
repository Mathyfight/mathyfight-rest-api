export class GetEquipmentsInteractorResponse {
  constructor(
    readonly nextPage: number | null,
    readonly equipments: GetEquipmentsEquipmentInteractorResponse[],
  ) {}
}

export class GetEquipmentsEquipmentInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly attack: number,
    readonly defense: number,
    readonly imageUrl: string,
    readonly description: string,
    readonly buyPrice: number,
  ) {}
}
