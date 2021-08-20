import { BattleMathProblemMathAreaStatistics } from '../../domain/entity/battle-math-problem-math-area-statistics';
import { BattleMathProblemMathTopicStatistics } from '../../domain/entity/battle-math-problem-math-topic-statistics';
import { BattleMathProblemStatistics } from '../../domain/entity/battle-math-problem-statistics';
import { BattleStatistics } from '../../domain/entity/battle-statistics';
import { User } from '../../domain/entity/user';

export abstract class GetPlayerStatisticsRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getBattleStatistics(userId: string): Promise<BattleStatistics>;
  abstract getBattleMathProblemStatistics(
    userId: string,
  ): Promise<BattleMathProblemStatistics>;
  abstract getBattleMathProblemByMathAreaStatistics(
    userId: string,
  ): Promise<BattleMathProblemMathAreaStatistics[]>;
  abstract getBattleMathProblemByMathTopicStatistics(
    userId: string,
  ): Promise<BattleMathProblemMathTopicStatistics[]>;
}
