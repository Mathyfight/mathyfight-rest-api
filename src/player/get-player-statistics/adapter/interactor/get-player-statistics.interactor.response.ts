import { BattleMathProblemMathAreaStatistics } from '../../domain/entity/battle-math-problem-math-area-statistics';
import { BattleMathProblemMathTopicStatistics } from '../../domain/entity/battle-math-problem-math-topic-statistics';
import { BattleMathProblemStatistics } from '../../domain/entity/battle-math-problem-statistics';
import { BattleStatistics } from '../../domain/entity/battle-statistics';

export class GetPlayerStatisticsInteractorResponse {
  readonly victories: number;
  readonly defeats: number;
  readonly battles: number;
  readonly mathProblems: {
    readonly total: number;
    readonly solved: number;
    readonly failed: number;
    readonly difficulties: {
      readonly easy: GetPlayerStatisticsDifficultyInteractorResponse;
      readonly intermediate: GetPlayerStatisticsDifficultyInteractorResponse;
      readonly advanced: GetPlayerStatisticsDifficultyInteractorResponse;
    };
    readonly mathAreas: GetPlayerStatisticsMathAreaInteractorResponse[];
  };

  constructor(
    battleStats: BattleStatistics,
    battleMathProblemStats: BattleMathProblemStatistics,
    battleMathProblemAreaStats: BattleMathProblemMathAreaStatistics[],
    battleMathProblemTopicStats: BattleMathProblemMathTopicStatistics[],
  ) {
    this.victories = battleStats.victories;
    this.battles = battleStats.battles;
    this.defeats = battleStats.defeats;
    this.mathProblems = {
      total: battleMathProblemStats.total,
      failed: battleMathProblemStats.failed,
      solved: battleMathProblemStats.solved,
      difficulties: battleMathProblemStats.difficulties,
      mathAreas: battleMathProblemAreaStats.map(
        (a) =>
          new GetPlayerStatisticsMathAreaInteractorResponse(
            a.name,
            a.total,
            a.solved,
            a.failed,
            battleMathProblemTopicStats.filter((t) => t.mathAreaId === a.id),
          ),
      ),
    };
  }
}

export class GetPlayerStatisticsDifficultyInteractorResponse {
  constructor(
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
  ) {}
}

export class GetPlayerStatisticsMathAreaInteractorResponse {
  constructor(
    readonly name: string,
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
    readonly topics: GetPlayerStatisticsMathTopicInteractorResponse[],
  ) {}
}

export class GetPlayerStatisticsMathTopicInteractorResponse {
  constructor(
    readonly name: string,
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
  ) {}
}
