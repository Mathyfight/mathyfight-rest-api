import { ApiProperty } from '@nestjs/swagger';
import { AdminAddMathTopicInteractorResponse } from '../adapter/interactor/admin-add-math-topic.interactor.response';

export class AdminMathTopicAddRouteResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  imageUrl: string;

  constructor(intRes: AdminAddMathTopicInteractorResponse) {
    this.id = intRes.id;
    this.imageUrl = intRes.imageUrl;
  }
}
