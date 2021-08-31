import { InjectRepository } from '@nestjs/typeorm';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { EditEnemyRepository } from '../adapter/interface/edit-enemy.repository';
import { EditEnemyCommand } from '../domain/command/edit-enemy.command';
import { User } from '../domain/entity/user';

export class EditEnemyRepositoryTypeOrmMySqlRepository
  implements EditEnemyRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user === undefined) return null;
    return new User(user.isAdmin);
  }

  async editEnemy(
    cmd: EditEnemyCommand,
    enemyImageUrl?: string,
  ): Promise<void> {
    const ormUpdateFields: {
      name?: string;
      imageUrl?: string;
    } = {};

    if (cmd.name !== undefined) ormUpdateFields.name = cmd.name;

    if (enemyImageUrl !== undefined) ormUpdateFields.imageUrl = enemyImageUrl;

    if (
      ormUpdateFields.name !== undefined ||
      ormUpdateFields.imageUrl !== undefined
    ) {
      await this.connection.transaction('SERIALIZABLE', async (manager) => {
        await manager.update(
          EnemyTypeOrmMySql,
          { id: cmd.enemyId },
          ormUpdateFields,
        );
      });
    }
  }
}
