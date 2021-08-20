export class BattleMathProblemStatistics {
  constructor(
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
    readonly difficulties: {
      readonly easy: BattleMathProblemDifficultyStatistics;
      readonly intermediate: BattleMathProblemDifficultyStatistics;
      readonly advanced: BattleMathProblemDifficultyStatistics;
    },
  ) {}
}

export class BattleMathProblemDifficultyStatistics {
  constructor(
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
  ) {}
}
