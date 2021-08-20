import { ApiProperty } from '@nestjs/swagger';
import { GetPlayerStatisticsInteractorResponse } from '../adapter/interactor/get-player-statistics.interactor.response';

export class PlayerGetStatisticsMathTopicRouteResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly solved: number;

  @ApiProperty()
  readonly failed: number;

  constructor(name: string, total: number, solved: number, failed: number) {
    this.name = name;
    this.total = total;
    this.solved = solved;
    this.failed = failed;
  }
}

export class PlayerGetStatisticsMathAreaRouteResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly solved: number;

  @ApiProperty()
  readonly failed: number;

  @ApiProperty({ type: [PlayerGetStatisticsMathTopicRouteResponse] })
  readonly topics: PlayerGetStatisticsMathTopicRouteResponse[];

  constructor(
    name: string,
    total: number,
    solved: number,
    failed: number,
    topics: PlayerGetStatisticsMathTopicRouteResponse[],
  ) {
    this.name = name;
    this.total = total;
    this.solved = solved;
    this.failed = failed;
    this.topics = topics;
  }
}

export class PlayerGetStatisticsDifficultyRouteResponse {
  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly solved: number;

  @ApiProperty()
  readonly failed: number;

  constructor(total: number, solved: number, failed: number) {
    this.failed = failed;
    this.solved = solved;
    this.total = total;
  }
}

export class PlayerGetStatisticsDifficultiesRouteResponse {
  @ApiProperty({ type: PlayerGetStatisticsDifficultyRouteResponse })
  readonly easy: PlayerGetStatisticsDifficultyRouteResponse;

  @ApiProperty({ type: PlayerGetStatisticsDifficultyRouteResponse })
  readonly intermediate: PlayerGetStatisticsDifficultyRouteResponse;

  @ApiProperty({ type: PlayerGetStatisticsDifficultyRouteResponse })
  readonly advanced: PlayerGetStatisticsDifficultyRouteResponse;

  constructor(
    easy: PlayerGetStatisticsDifficultyRouteResponse,
    intermediate: PlayerGetStatisticsDifficultyRouteResponse,
    advanced: PlayerGetStatisticsDifficultyRouteResponse,
  ) {
    this.easy = easy;
    this.intermediate = intermediate;
    this.advanced = advanced;
  }
}

export class PlayerGetStatisticsMathProblemsRouteResponse {
  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly solved: number;

  @ApiProperty()
  readonly failed: number;

  @ApiProperty({ type: PlayerGetStatisticsDifficultiesRouteResponse })
  readonly difficulties: PlayerGetStatisticsDifficultiesRouteResponse;

  @ApiProperty({ type: [PlayerGetStatisticsMathAreaRouteResponse] })
  readonly mathAreas: PlayerGetStatisticsMathAreaRouteResponse[];

  constructor(
    total: number,
    solved: number,
    failed: number,
    difficulties: PlayerGetStatisticsDifficultiesRouteResponse,
    mathAreas: PlayerGetStatisticsMathAreaRouteResponse[],
  ) {
    this.total = total;
    this.solved = solved;
    this.failed = failed;
    this.difficulties = difficulties;
    this.mathAreas = mathAreas;
  }
}

export class PlayerGetStatisticsRouteResponse {
  @ApiProperty()
  readonly victories: number;

  @ApiProperty()
  readonly defeats: number;

  @ApiProperty()
  readonly battles: number;

  @ApiProperty({ type: PlayerGetStatisticsMathProblemsRouteResponse })
  readonly mathProblems: PlayerGetStatisticsMathProblemsRouteResponse;

  constructor(intRes: GetPlayerStatisticsInteractorResponse) {
    this.battles = intRes.battles;
    this.defeats = intRes.defeats;
    this.victories = intRes.victories;
    this.mathProblems = intRes.mathProblems;
  }
}
