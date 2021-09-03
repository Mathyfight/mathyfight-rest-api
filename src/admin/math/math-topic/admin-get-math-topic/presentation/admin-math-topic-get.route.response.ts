import { ApiProperty } from '@nestjs/swagger';
import {
  AdminGetMathTopicInteractorResponse,
  AdminGetMathTopicLevelInteractorResponse,
} from '../adapter/interactor/admin-get-math-topic.interactor.response';

export class AdminMathTopicLevelGetRouteResponse {
  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly enemyName: string;

  @ApiProperty()
  readonly enemyImageUrl: string;

  constructor(res: AdminGetMathTopicLevelInteractorResponse) {
    this.number = res.number;
    this.enemyImageUrl = res.enemyImageUrl;
    this.enemyName = res.enemyName;
  }
}

export class AdminMathTopicGetRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ type: [AdminMathTopicLevelGetRouteResponse] })
  readonly levels: AdminMathTopicLevelGetRouteResponse[];

  constructor(res: AdminGetMathTopicInteractorResponse) {
    this.id = res.id;
    this.description = res.description;
    this.imageUrl = res.imageUrl;
    this.name = res.name;
    this.levels = res.levels.map(
      (l) => new AdminMathTopicLevelGetRouteResponse(l),
    );
  }
}
