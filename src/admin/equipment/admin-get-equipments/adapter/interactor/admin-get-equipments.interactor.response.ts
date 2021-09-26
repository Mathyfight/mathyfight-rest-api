export class AdminGetEquipmentsInteractorResponse {
  constructor(
    readonly id: string,
    readonly imageUrl: string,
    readonly name: string,
    readonly description: string,
    readonly sellPrice: number,
    readonly buyPrice: number,
    readonly attack: number,
    readonly defense: number,
    readonly isActive: boolean,
  ) {}
}
