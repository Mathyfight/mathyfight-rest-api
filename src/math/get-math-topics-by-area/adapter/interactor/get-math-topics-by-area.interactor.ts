import { Injectable } from '@nestjs/common';
import { GetMathTopicsByAreaRepository } from '../interface/get-math-topics-by-area.repository';
import { GetMathTopicsByAreaInteractorRequest } from './get-math-topics-by-area.interactor.request';
import { GetMathTopicsByAreaInteractorResponse } from './get-math-topics-by-area.interactor.response';

@Injectable()
export class GetMathTopicsByAreaInteractor {
  constructor(readonly repository: GetMathTopicsByAreaRepository) {}

  async invoke(
    request: GetMathTopicsByAreaInteractorRequest,
  ): Promise<GetMathTopicsByAreaInteractorResponse[]> {
    const mathAreas = await this.repository.getMathTopicsByMathAreaId(
      request.mathAreaId.val,
    );
    return mathAreas.map((ma) => new GetMathTopicsByAreaInteractorResponse(ma));
  }
}
