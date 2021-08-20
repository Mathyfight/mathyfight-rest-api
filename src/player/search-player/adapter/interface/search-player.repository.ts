import { User } from '../../domain/entity/user';

export abstract class SearchPlayerRepository {
  abstract getUsersByUsernameLike(username: string): Promise<User[]>;
}
