import { PersistMathTopic } from '../../domain/command/persist-math-topic';
import { Enemy } from '../../domain/entity/enemy';
import { Level } from '../../domain/entity/level';
import { MathArea } from '../../domain/entity/math-area';
import { Player } from '../../domain/entity/player';
import { User } from '../../domain/entity/user';

export abstract class AdminAddMathTopicRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathAreaById(mathAreaId: string): Promise<MathArea | null>;
  abstract getAllLevels(): Promise<Level[]>;
  abstract getAllPlayers(): Promise<Player[]>;
  abstract getUnusedEnemies(): Promise<Enemy[]>;
  abstract persistMathTopic(cmd: PersistMathTopic): Promise<void>;
}
