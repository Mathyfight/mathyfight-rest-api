import { ApiProperty } from '@nestjs/swagger';
import { GetMathAreasInteractorResponse } from '../adapter/interactor/get-math-areas.interactor.response';

export class MathGetAreasRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(id: string, name: string, description: string, imageUrl: string) {
    this.description = description;
    this.id = id;
    this.imageUrl = imageUrl;
    this.name = name;
  }

  static fromInteractor = (
    response: GetMathAreasInteractorResponse,
  ): MathGetAreasRouteResponse =>
    new MathGetAreasRouteResponse(
      response.id,
      response.name,
      response.description,
      response.imageUrl,
    );
}
