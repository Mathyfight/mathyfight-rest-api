export class BattleMathProblemMathTopicStatistics {
  constructor(
    readonly id: string,
    readonly mathAreaId: string,
    readonly name: string,
    readonly total: number,
    readonly solved: number,
    readonly failed: number,
  ) {}
}
