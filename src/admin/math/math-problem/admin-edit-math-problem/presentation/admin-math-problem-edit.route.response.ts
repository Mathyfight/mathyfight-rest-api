import { ApiProperty } from '@nestjs/swagger';
import { AdminEditMathProblemInteractorResponse } from '../adapter/interactor/admin-edit-math-problem.interactor.response';

export class AdminMathProblemEditRouteResponse {
  @ApiProperty({ type: String })
  imageUrl!: string | null;

  constructor(res: AdminEditMathProblemInteractorResponse) {
    this.imageUrl = res.imageUrl;
  }
}
