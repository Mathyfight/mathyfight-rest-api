import { EnemyAttacksPlayer } from '../../domain/command/enemy-attacks-player';
import { PlayerAttacksEnemy } from '../../domain/command/player-attacks-enemy';
import { Battle } from '../../domain/entity/battle';
import { MathAnswer } from '../../domain/entity/math-answer';
import { User } from '../../domain/entity/user';

export abstract class TryAttackRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getBattleById(battleId: string): Promise<Battle | null>;
  abstract getMathAnswerById(mathAnswerId: string): Promise<MathAnswer | null>;
  abstract enemyAttacksPlayer(cmd: EnemyAttacksPlayer): Promise<void>;
  abstract playerAttacksEnemy(cmd: PlayerAttacksEnemy): Promise<void>;
}
