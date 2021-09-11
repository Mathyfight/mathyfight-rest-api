export class MathProblem {
  constructor(
    readonly id: string,
    readonly mathAnswersIds: string[],
    readonly battlesMathProblemsIds: string[],
    readonly imageUrl: string | null,
  ) {}

  readonly canBeDeleted = this.battlesMathProblemsIds.length === 0;
}
