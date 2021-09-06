import { InjectRepository } from '@nestjs/typeorm';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { LevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/level.typeorm.mysql';
import { MathAreaTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-area.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AdminAddMathTopicRepository } from '../adapter/interface/admin-add-math-topic.repository';
import { PersistMathTopic } from '../domain/command/persist-math-topic';
import { Enemy } from '../domain/entity/enemy';
import { Level } from '../domain/entity/level';
import { MathArea } from '../domain/entity/math-area';
import { Player } from '../domain/entity/player';
import { User } from '../domain/entity/user';

export class AdminAddMathTopicTypeOrmMySqlRepository
  implements AdminAddMathTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathAreaTypeOrmMySql)
    private readonly mathAreaRepository: Repository<MathAreaTypeOrmMySql>,
    @InjectRepository(PlayerTypeOrmMySql)
    private readonly playerRepository: Repository<PlayerTypeOrmMySql>,
    @InjectRepository(LevelTypeOrmMySql)
    private readonly levelRepository: Repository<LevelTypeOrmMySql>,
    @InjectRepository(EnemyTypeOrmMySql)
    private readonly enemyRepository: Repository<EnemyTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUnusedEnemies(): Promise<Enemy[]> {
    const ormEnemies: { id: string }[] = await this.enemyRepository.query(`
      select e.id as id
      from enemy e
      left join math_topic_level mtl on mtl.enemy_id =e.id 
      where mtl.enemy_id is null
      group by e.id 
    `);
    return ormEnemies.map((e) => new Enemy(e.id));
  }

  async getAllLevels(): Promise<Level[]> {
    const ormLevels = await this.levelRepository.find();
    return ormLevels.map((l) => new Level(l.id, l.number));
  }

  async getAllPlayers(): Promise<Player[]> {
    const ormPlayers = await this.playerRepository.find();
    return ormPlayers.map((p) => new Player(p.id));
  }

  async getMathAreaById(mathAreaId: string): Promise<MathArea | null> {
    const ormMathArea = await this.mathAreaRepository.findOne(mathAreaId);
    if (ormMathArea === undefined) return null;
    return new MathArea(ormMathArea.id);
  }

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async persistMathTopic(cmd: PersistMathTopic): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(MathTopicTypeOrmMySql, {
        id: cmd.id,
        description: cmd.description,
        imageUrl: cmd.imageUrl,
        name: cmd.name,
        isActive: cmd.isActive,
        mathArea: { id: cmd.mathAreaId },
      });
      await manager.insert(
        MathTopicLevelTypeOrmMySql,
        cmd.mathTopicLevels.map((l) => ({
          id: l.id,
          enemy: { id: l.enemyId },
          level: { id: l.levelId },
          mathTopic: { id: cmd.id },
        })),
      );
      await manager.insert(
        PlayerUnlockedMathTopicLevelTypeOrmMySql,
        cmd.mathTopicLevels
          .filter((l) => l.playerUnlockedLevels !== null)
          .flatMap((l) =>
            l.playerUnlockedLevels!.flatMap(
              (u) =>
                ({
                  id: u.id,
                  mathTopicLevel: { id: l.id },
                  player: { id: u.playerId },
                } as QueryDeepPartialEntity<PlayerUnlockedMathTopicLevelTypeOrmMySql>),
            ),
          ),
      );
    });
  }
}
