import { Injectable } from '@nestjs/common';
import { SearchPlayerRepository } from '../interface/search-player.repository';
import { SearchPlayerInteractorRequest } from './search-player.interactor.request';
import { SearchPlayerInteractorResponse } from './search-player.interactor.response';

@Injectable()
export class SearchPlayerInteractor {
  constructor(private readonly repository: SearchPlayerRepository) {}

  async invoke(
    request: SearchPlayerInteractorRequest,
  ): Promise<SearchPlayerInteractorResponse[]> {
    const users = await this.repository.getUsersByUsernameLike(
      request.username,
    );
    return users.map(
      (u) =>
        new SearchPlayerInteractorResponse(
          u.id,
          u.username,
          u.imageUrl,
          u.color,
          u.helmetImageUrl,
          u.chestplateImageUrl,
          u.leggingsImageUrl,
          u.bootsImageUrl,
          u.weaponImageUrl,
          u.shieldImageUrl,
        ),
    );
  }
}
