import { ApiProperty } from '@nestjs/swagger';
import { AdminEditMathTopicInteratorResponse } from '../adapter/interactor/admin-edit-math-topic.interactor.response';

export class AdminMathTopicEditRouteResponse {
  @ApiProperty({ type: String })
  readonly imageUrl: string | null;

  constructor(intRes: AdminEditMathTopicInteratorResponse) {
    this.imageUrl = intRes.imageUrl;
  }
}
