import { Battle } from '../../domain/entity/battle';
import { User } from '../../domain/entity/user';

export abstract class GetBattleRepository {
  abstract getBattle(battleId: string): Promise<Battle | null>;
  abstract getUserById(userId: string): Promise<User | null>;
}
