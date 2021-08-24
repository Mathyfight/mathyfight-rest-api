import { Injectable } from '@nestjs/common';
import { GetMathAreasRepository } from '../interface/get-math-areas.repository';
import { GetMathAreasInteractorResponse } from './get-math-areas.interactor.response';

@Injectable()
export class GetMathAreasInteractor {
  constructor(readonly repository: GetMathAreasRepository) {}

  async invoke(): Promise<GetMathAreasInteractorResponse[]> {
    const mathAreas = await this.repository.getMathAreas();
    return mathAreas.map((ma) => new GetMathAreasInteractorResponse(ma));
  }
}
