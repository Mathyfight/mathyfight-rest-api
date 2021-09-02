import { Injectable } from '@nestjs/common';
import { GetEnemiesRepository } from '../interface/get-enemies.repository';
import { GetEnemiesInteractorRequest } from './get-enemies.interactor.request';
import { GetEnemiesInteractorResponse } from './get-enemies.interactor.response';

@Injectable()
export class GetEnemiesInteractor {
  constructor(private repository: GetEnemiesRepository) {}

  async invoke(
    req: GetEnemiesInteractorRequest,
  ): Promise<GetEnemiesInteractorResponse[]> {
    const enemies = await this.repository.getEnemies(req.available);
    return enemies.map((e) => new GetEnemiesInteractorResponse(e));
  }
}
