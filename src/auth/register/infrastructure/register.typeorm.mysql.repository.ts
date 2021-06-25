import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { RegisterRepository } from '../application/adapter/register.repository';
import { RegisterNewUser } from '../domain/command/register-new-user';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(PlayerTypeOrmMySql)
    readonly playerRepository: Repository<PlayerTypeOrmMySql>,
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
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

  async saveNewUser(command: RegisterNewUser): Promise<void> {
    await this.userRepository.save({
      id: command.id,
      email: command.email,
      hashedPassword: command.hashedPassword,
      username: command.username,
    });
    await this.playerRepository.save({
      id: command.player.id,
      gold: command.player.gold,
      user: { id: command.id },
    });
    await this.avatarRepository.save({
      id: command.player.avatar.id,
      name: command.player.avatar.name,
      currentExperience: command.player.avatar.currentExperience,
      color: command.player.avatar.color,
      attack: command.player.avatar.attack,
      defense: command.player.avatar.defense,
      health: command.player.avatar.health,
      level: command.player.avatar.level,
      race: command.player.avatar.race,
      player: { id: command.player.id },
    });
  }
}
