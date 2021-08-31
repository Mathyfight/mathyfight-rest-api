import { Injectable } from '@nestjs/common';
import { GetEnemiesRepository } from '../interface/get-enemies.repository';
import { GetEnemiesInteractorResponse } from './get-enemies.interactor.response';

@Injectable()
export class GetEnemiesInteractor {
  constructor(private repository: GetEnemiesRepository) {}

  async invoke(): Promise<GetEnemiesInteractorResponse[]> {
    const enemies = await this.repository.getEnemies();
    return enemies.map((e) => new GetEnemiesInteractorResponse(e));
  }
}
