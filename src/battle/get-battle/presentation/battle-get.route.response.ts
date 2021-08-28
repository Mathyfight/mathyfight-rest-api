import { ApiProperty } from '@nestjs/swagger';
import {
  GetBattleInteractorResponse,
  GetBattleLevelUpInteractorResponse,
} from '../adapter/interactor/get-battle.interactor.response';

export class BattleGetLevelUpRouteResponse {
  @ApiProperty()
  readonly health: number;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  constructor(levelUp: GetBattleLevelUpInteractorResponse) {
    this.health = levelUp.health;
    this.defense = levelUp.defense;
    this.attack = levelUp.attack;
  }
}

export class BattleGetRouteResponse {
  @ApiProperty()
  readonly playerHealth: number;

  @ApiProperty()
  readonly playerDefense: number;

  @ApiProperty()
  readonly enemyHealth: number;

  @ApiProperty()
  readonly enemyDefense: number;

  @ApiProperty({ type: Boolean })
  readonly playerWon: boolean | null;

  @ApiProperty({ type: BattleGetLevelUpRouteResponse })
  readonly levelUp: BattleGetLevelUpRouteResponse | null;

  @ApiProperty({ type: String })
  readonly nextLevelId: string | null;

  constructor(intResponse: GetBattleInteractorResponse) {
    this.playerHealth = intResponse.playerHealth;
    this.playerDefense = intResponse.playerDefense;
    this.enemyHealth = intResponse.enemyHealth;
    this.enemyDefense = intResponse.enemyDefense;
    this.nextLevelId = intResponse.nextLevelId;
    this.playerWon = intResponse.playerWon;
    this.levelUp = intResponse.levelUp;
  }
}
