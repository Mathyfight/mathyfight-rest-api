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

  async getEnemies(available: boolean | undefined): Promise<Enemy[]> {
    let enemies: { id: string; name: string; imageUrl: string }[];
    if (available !== undefined) {
      enemies = await this.enemyRepository.query(`
        select e.id as id, e.name as name, e.image_url as imageUrl
        from enemy e 
        left join math_topic_level mtl 
        on mtl.enemy_id =e.id
        where mtl.id is ${available ? 'null' : 'not null'}
        group by e.id
      `);
    } else {
      enemies = await this.enemyRepository.query(`
        select e.id as id, e.name as name, e.image_url as imageUrl
        from enemy e
      `);
    }
    return enemies.map((e) => new Enemy(e.id, e.name, e.imageUrl));
  }
}
