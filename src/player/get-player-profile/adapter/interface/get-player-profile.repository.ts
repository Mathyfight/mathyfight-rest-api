import { User } from '../../domain/entity/user';

export abstract class GetPlayerProfileRepository {
  abstract getUserById(userId: string): Promise<User | null>;
}
