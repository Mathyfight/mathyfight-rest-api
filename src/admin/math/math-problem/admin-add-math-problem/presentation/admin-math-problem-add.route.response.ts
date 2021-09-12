import { ApiProperty } from '@nestjs/swagger';
import { AdminAddMathProblemInteractorResponse } from '../adapter/interactor/admin-add-math-problem.interactor.response';

export class AdminMathProblemAddRouteResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: String })
  imageUrl: string | null;

  constructor(intRes: AdminAddMathProblemInteractorResponse) {
    this.id = intRes.id;
    this.imageUrl = intRes.imageUrl;
  }
}
