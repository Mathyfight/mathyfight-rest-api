import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { RegisterRepository } from '../adapter/interface/register.repository';
import { RegisterCommand } from '../domain/command/register.command';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getOneUserIdByUsername(username: string): Promise<string | null> {
    const ormUser = await this.userRepository.findOne({
      where: { username: username },
    });
    if (ormUser === undefined) return null;
    return ormUser.id;
  }

  async getOneUserIdByEmail(email: string): Promise<string | null> {
    const ormUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (ormUser === undefined) return null;
    return ormUser.id;
  }

  async registerNewUser(cmd: RegisterCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.insert(UserTypeOrmMySql, {
        id: cmd.registerNewUser.id,
        email: cmd.registerNewUser.email,
        hashedPassword: cmd.registerNewUser.hashedPassword,
        username: cmd.registerNewUser.username,
      });
      await manager.insert(PlayerTypeOrmMySql, {
        id: cmd.registerNewUser.player.id,
        gold: cmd.registerNewUser.player.gold,
        user: { id: cmd.registerNewUser.id },
      });
      await manager.insert(AvatarTypeOrmMySql, {
        id: cmd.registerNewUser.player.avatar.id,
        name: cmd.registerNewUser.player.avatar.name,
        currentExperience: cmd.registerNewUser.player.avatar.currentExperience,
        color: cmd.registerNewUser.player.avatar.color,
        attack: cmd.registerNewUser.player.avatar.attack,
        defense: cmd.registerNewUser.player.avatar.defense,
        health: cmd.registerNewUser.player.avatar.health,
        level: cmd.registerNewUser.player.avatar.level,
        race: cmd.registerNewUser.player.avatar.race,
        player: { id: cmd.registerNewUser.player.id },
      });
    });
  }
}
