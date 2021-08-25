import { ApiProperty } from '@nestjs/swagger';
import { GetMathTopicsByAreaInteractorResponse } from '../adapter/interactor/get-math-topics-by-area.interactor.response';

export class MathGetTopicsByAreaRouteResponse {
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
    response: GetMathTopicsByAreaInteractorResponse,
  ): MathGetTopicsByAreaRouteResponse =>
    new MathGetTopicsByAreaRouteResponse(
      response.id,
      response.name,
      response.description,
      response.imageUrl,
    );
}
