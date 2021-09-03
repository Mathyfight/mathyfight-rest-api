import { InjectRepository } from '@nestjs/typeorm';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { MathAreaTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-area.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, In, Repository } from 'typeorm';
import { AdminEditMathTopicRepository } from '../adapter/interface/admin-edit-math-topic.repository';
import { PersistMathTopic } from '../domain/command/persist-math-topic';
import { Enemy } from '../domain/entity/enemy';
import { MathArea } from '../domain/entity/math-area';
import { MathTopic } from '../domain/entity/math-topic';
import { User } from '../domain/entity/user';

export class AdminEditMathTopicTypeOrmMySqlRepository
  implements AdminEditMathTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicTypeOrmMySql)
    private readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
    @InjectRepository(MathAreaTypeOrmMySql)
    private readonly mathAreaRepository: Repository<MathAreaTypeOrmMySql>,
    @InjectRepository(EnemyTypeOrmMySql)
    private readonly enemyRepository: Repository<EnemyTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async getMathTopicById(mathTopicId: string): Promise<MathTopic | null> {
    const ormMT = await this.mathTopicRepository.findOne(mathTopicId, {
      relations: ['mathTopicLevels', 'mathTopicLevels.level'],
    });
    if (ormMT === undefined) return null;
    return new MathTopic(
      ormMT.id,
      ormMT.mathTopicLevels
        .sort((a, b) => a.level.number - b.level.number)
        .map((l) => l.id),
    );
  }

  async getMathAreaById(mathAreaId: string): Promise<MathArea | null> {
    const ormMA = await this.mathAreaRepository.findOne(mathAreaId);
    if (ormMA === undefined) return null;
    return new MathArea(ormMA.id);
  }

  async getEnemies(
    enemyIds: string[],
    mathTopicId: string,
  ): Promise<(Enemy | null)[]> {
    const ormEnemies: { id: string; insideRows: string }[] =
      await this.enemyRepository.query(
        `
        select
        e.id as id,
        (
        select
          count(*)
        from
          math_topic_level mtl
        where
          mtl.enemy_id = e.id 
          and mtl.math_topic_id <> ?
        ) as insideRows
        from
          enemy e
        where
	        e.id in (?)
      `,
        [mathTopicId, enemyIds],
      );
    return enemyIds.map((e) => {
      const ormEnemy = ormEnemies.find((oe) => oe.id === e);
      return ormEnemy === undefined
        ? null
        : new Enemy(ormEnemy.id, ormEnemy.insideRows === '0');
    });
  }

  async getImageUrlFromMathTopic(id: string): Promise<string | null> {
    const ormMathTopic = await this.mathTopicRepository.findOne(id);
    if (ormMathTopic === undefined) return null;
    return ormMathTopic.imageUrl;
  }

  async persistMathTopic(cmd: PersistMathTopic): Promise<void> {
    const ormUpdateFields: {
      name?: string;
      description?: string;
      mathArea?: { id: string };
      imageUrl?: string;
    } = {};

    if (cmd.description !== undefined)
      ormUpdateFields.description = cmd.description;
    if (cmd.imageUrl !== undefined) ormUpdateFields.imageUrl = cmd.imageUrl;
    if (cmd.mathAreaId !== undefined)
      ormUpdateFields.mathArea = { id: cmd.mathAreaId };
    if (cmd.name !== undefined) ormUpdateFields.name = cmd.name;

    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      if (
        ormUpdateFields.description !== undefined ||
        ormUpdateFields.imageUrl !== undefined ||
        ormUpdateFields.mathArea !== undefined ||
        ormUpdateFields.name !== undefined
      ) {
        await manager.update(
          MathTopicTypeOrmMySql,
          { id: cmd.id },
          ormUpdateFields,
        );
      }
      if (cmd.enemyIds !== undefined && cmd.mathTopicLevelIds !== undefined) {
        for (let i = 0; i < cmd.mathTopicLevelIds.length; i++) {
          await manager.update(
            MathTopicLevelTypeOrmMySql,
            { id: cmd.mathTopicLevelIds[i] },
            { enemy: { id: cmd.enemyIds[i] } },
          );
        }
      }
    });
  }
}
