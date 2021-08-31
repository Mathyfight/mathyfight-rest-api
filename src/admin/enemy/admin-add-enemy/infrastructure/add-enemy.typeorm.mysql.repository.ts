import { InjectRepository } from '@nestjs/typeorm';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { AddEnemyRepository } from '../adapter/interface/add-enemy.repository';
import { AddEnemyCommand } from '../domain/command/add-enemy.command';
import { User } from '../domain/entity/user';

export class AddEnemyRepositoryTypeOrmMySqlRepository
  implements AddEnemyRepository
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

  async addEnemy(cmd: AddEnemyCommand, imageUrl: string): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(EnemyTypeOrmMySql, {
        id: cmd.id,
        name: cmd.name,
        imageUrl: imageUrl,
      });
    });
    return;
  }
}
