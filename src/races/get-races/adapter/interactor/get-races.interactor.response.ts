export class GetRacesInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly gender: string,
    readonly imageUrl: string,
  ) {}
}
