import { ApiProperty } from '@nestjs/swagger';
import { GetEnemyOfBattleInteractorResponse } from '../adapter/interactor/get-enemy-of-battle.interactor.response';

export class BattleGetEnemyRouteResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly maxHealth: number;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(intResponse: GetEnemyOfBattleInteractorResponse) {
    this.attack = intResponse.attack;
    this.defense = intResponse.defense;
    this.imageUrl = intResponse.imageUrl;
    this.maxHealth = intResponse.maxHealth;
    this.name = intResponse.name;
  }
}
