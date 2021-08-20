import { Injectable } from '@nestjs/common';
import { GetRacesRepository } from '../interface/get-races.repository';
import { GetRacesInteractorResponse } from './get-races.interactor.response';

@Injectable()
export class GetRacesInteractor {
  constructor(private readonly repository: GetRacesRepository) {}

  async invoke(): Promise<GetRacesInteractorResponse[]> {
    const races = await this.repository.getallRaces();
    return races.map(
      (r) => new GetRacesInteractorResponse(r.id, r.name, r.gender, r.imageUrl),
    );
  }
}
