export class MathTopic {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly difficultyLevels: Level[],
  ) {}
}

export class Level {
  constructor(
    readonly id: string,
    readonly number: number,
    readonly goldGained: number,
    readonly experienceGained: number,
    readonly unlocked: boolean,
    readonly enemy: Enemy,
  ) {}

  readonly name = `Nivel ${this.number}`;
}

export class Enemy {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly imageUrl: string,
    readonly maxHealth: number,
    readonly attack: number,
    readonly defense: number,
  ) {}
}
