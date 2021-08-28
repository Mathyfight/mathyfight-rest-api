import { Enemy } from '../../domain/entity/enemy';

export class GetEnemyOfBattleInteractorResponse {
  readonly name: string;
  readonly maxHealth: number;
  readonly attack: number;
  readonly defense: number;
  readonly imageUrl: string;

  constructor(enemy: Enemy) {
    this.attack = enemy.attack;
    this.defense = enemy.defense;
    this.imageUrl = enemy.imageUrl;
    this.maxHealth = enemy.maxHealth;
    this.name = enemy.name;
  }
}
