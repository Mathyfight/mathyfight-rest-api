export class MathTopic {
  constructor(
    readonly id: string,
    readonly imageUrl: string,
    readonly mathTopicLevels: MathTopicLevel[],
  ) {}

  readonly hasAnyBattle = this.mathTopicLevels.some((l) =>
    l.playerUnlockedLevels.some((u) => u.battles.length > 0),
  );
}

export class MathTopicLevel {
  constructor(
    readonly id: string,
    readonly playerUnlockedLevels: PlayerUnlockedMathTopicLevel[],
  ) {}
}

export class PlayerUnlockedMathTopicLevel {
  constructor(readonly id: string, readonly battles: Battle[]) {}
}

export class Battle {
  constructor(readonly id: string) {}
}
