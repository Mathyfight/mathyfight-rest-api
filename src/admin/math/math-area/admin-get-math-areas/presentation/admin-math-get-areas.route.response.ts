import { ApiProperty } from '@nestjs/swagger';
import {
  AdminGetMathAreasInteractorResponse,
  AdminGetMathAreasTopicInteractorResponse,
} from '../adapter/interactor/admin-get-math-areas.interactor.response';

export class AdminMathGetAreasTopicRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(intRes: AdminGetMathAreasTopicInteractorResponse) {
    this.id = intRes.id;
    this.name = intRes.name;
    this.imageUrl = intRes.imageUrl;
  }
}

export class AdminMathGetAreasRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ type: [AdminMathGetAreasTopicRouteResponse] })
  readonly mathTopics: AdminMathGetAreasTopicRouteResponse[];

  constructor(intRes: AdminGetMathAreasInteractorResponse) {
    this.id = intRes.id;
    this.name = intRes.name;
    this.mathTopics = intRes.mathTopics.map(
      (mt) => new AdminMathGetAreasTopicRouteResponse(mt),
    );
  }
}
