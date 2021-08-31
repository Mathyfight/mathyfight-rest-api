import { InjectRepository } from '@nestjs/typeorm';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { GetEnemiesRepository } from '../adapter/interface/get-enemies.repository';
import { Enemy } from '../domain/entity/enemy';

export class GetEnemiesRepositoryTypeOrmMySqlRepository
  implements GetEnemiesRepository
{
  constructor(
    @InjectRepository(EnemyTypeOrmMySql)
    readonly enemyRepository: Repository<EnemyTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getEnemies(): Promise<Enemy[]> {
    const enemies = await this.enemyRepository.find();
    return enemies.map((e) => new Enemy(e.id, e.name, e.imageUrl));
  }
}
