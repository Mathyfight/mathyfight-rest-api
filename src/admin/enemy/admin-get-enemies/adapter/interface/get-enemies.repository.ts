import { Enemy } from '../../domain/entity/enemy';

export abstract class GetEnemiesRepository {
  abstract getEnemies(): Promise<Enemy[]>;
}
