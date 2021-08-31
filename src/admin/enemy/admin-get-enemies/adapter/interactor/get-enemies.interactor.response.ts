import { Enemy } from '../../domain/entity/enemy';

export class GetEnemiesInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;

  constructor(enemy: Enemy) {
    this.id = enemy.id;
    this.name = enemy.name;
    this.imageUrl = enemy.imageUrl;
  }
}
