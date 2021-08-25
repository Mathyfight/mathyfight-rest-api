import { Enemy, Level, MathTopic } from '../../domain/entity/math-topic';

export class GetMathTopicInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly levels: GetMathTopicLevelInteractorResponse[];

  constructor(mathTopic: MathTopic) {
    this.description = mathTopic.description;
    this.id = mathTopic.id;
    this.imageUrl = mathTopic.imageUrl;
    this.name = mathTopic.name;
    this.levels = mathTopic.difficultyLevels.map(
      (dl) => new GetMathTopicLevelInteractorResponse(dl),
    );
  }
}

export class GetMathTopicLevelInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly goldGained: number;
  readonly experienceGained: number;
  readonly unlocked: boolean;
  readonly enemy: GetMathTopicLevelEnemyInteractorResponse;

  constructor(level: Level) {
    this.id = level.id;
    this.name = level.name;
    this.goldGained = level.goldGained;
    this.experienceGained = level.experienceGained;
    this.unlocked = level.unlocked;
    this.enemy = new GetMathTopicLevelEnemyInteractorResponse(level.enemy);
  }
}

export class GetMathTopicLevelEnemyInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly maxHealth: number;
  readonly attack: number;
  readonly defense: number;

  constructor(enemy: Enemy) {
    this.id = enemy.id;
    this.name = enemy.name;
    this.imageUrl = enemy.imageUrl;
    this.maxHealth = enemy.maxHealth;
    this.attack = enemy.attack;
    this.defense = enemy.defense;
  }
}
