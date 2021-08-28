import { StartBattleCommand } from '../../domain/command/start-battle.command';
import { MathTopicLevel } from '../../domain/entity/math-topic-level';
import { User } from '../../domain/entity/user';

export abstract class StartBattleRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathTopicLevelById(
    mathTopicLevelId: string,
  ): Promise<MathTopicLevel | null>;
  abstract startBattle(cmd: StartBattleCommand): Promise<void>;
}
