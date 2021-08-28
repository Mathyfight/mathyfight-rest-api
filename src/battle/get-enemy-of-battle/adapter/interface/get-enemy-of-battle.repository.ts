import { Battle } from '../../domain/entity/battle';

export abstract class GetEnemyOfBattleRepository {
  abstract getBattleById(battleId: string): Promise<Battle | null>;
}
