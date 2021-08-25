import { ApiProperty } from '@nestjs/swagger';
import {
  GetMathTopicInteractorResponse,
  GetMathTopicLevelEnemyInteractorResponse,
  GetMathTopicLevelInteractorResponse,
} from '../adapter/interactor/get-math-topic.interactor.response';

export class GetMathTopicLevelEnemyRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly maxHealth: number;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  constructor(enemy: GetMathTopicLevelEnemyInteractorResponse) {
    this.attack = enemy.attack;
    this.defense = enemy.defense;
    this.id = enemy.id;
    this.imageUrl = enemy.imageUrl;
    this.maxHealth = enemy.maxHealth;
    this.name = enemy.name;
  }
}

export class GetMathTopicLevelRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly goldGained: number;

  @ApiProperty()
  readonly experienceGained: number;

  @ApiProperty()
  readonly unlocked: boolean;

  @ApiProperty()
  readonly enemy: GetMathTopicLevelEnemyRouteResponse;

  constructor(level: GetMathTopicLevelInteractorResponse) {
    this.id = level.id;
    this.experienceGained = level.experienceGained;
    this.goldGained = level.goldGained;
    this.name = level.name;
    this.unlocked = level.unlocked;
    this.enemy = new GetMathTopicLevelEnemyRouteResponse(level.enemy);
  }
}

export class MathGetTopicRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty({ type: [GetMathTopicLevelRouteResponse] })
  readonly levels: GetMathTopicLevelRouteResponse[];

  constructor(interactorResponse: GetMathTopicInteractorResponse) {
    this.id = interactorResponse.id;
    this.description = interactorResponse.description;
    this.imageUrl = interactorResponse.imageUrl;
    this.name = interactorResponse.name;
    this.levels = interactorResponse.levels.map(
      (l) => new GetMathTopicLevelRouteResponse(l),
    );
  }
}
