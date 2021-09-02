import { Enemy } from '../../domain/entity/enemy';

export abstract class GetEnemiesRepository {
  abstract getEnemies(available: boolean | undefined): Promise<Enemy[]>;
}
