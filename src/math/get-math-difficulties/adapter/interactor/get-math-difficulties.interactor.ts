import { Injectable } from '@nestjs/common';
import { GetMathDifficultiesRepository } from '../interface/get-math-difficulties.repository';
import { GetMathDifficultiesInteractorResponse } from './get-math-difficulties.interactor.response';

@Injectable()
export class GetMathDifficultiesInteractor {
  constructor(private readonly repository: GetMathDifficultiesRepository) {}

  async invoke(): Promise<GetMathDifficultiesInteractorResponse[]> {
    const difficulties = await this.repository.getMathDifficulties();
    return difficulties.map(
      (d) => new GetMathDifficultiesInteractorResponse(d),
    );
  }
}
