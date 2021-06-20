export class GetEquipmentsAppServiceResponse {
  constructor(
    readonly nextPage: number | null,
    readonly equipments: GetEquipmentsEquipmentAppServiceResponse[],
  ) {}
}

export class GetEquipmentsEquipmentAppServiceResponse {
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
