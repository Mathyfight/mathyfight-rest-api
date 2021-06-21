import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/auth/core/domain/value-object/email';
import { Username } from 'src/auth/core/domain/value-object/username';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { Repository } from 'typeorm';
import { RegisterRepository } from '../application/adapter/register.repository';
import { User } from '../domain/entity/user';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(PlayerTypeOrmMySql)
    readonly playerRepository: Repository<PlayerTypeOrmMySql>,
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
  ) {}

  async getOneUserIdByUsername(username: Username): Promise<Uuid | null> {
    const ormUser = await this.userRepository.findOne({
      where: { username: username.val },
    });
    if (ormUser === undefined) return null;
    return Uuid.fromExisting(ormUser.id);
  }

  async getOneUserIdByEmail(email: Email): Promise<Uuid | null> {
    const ormUser = await this.userRepository.findOne({
      where: { email: email.val },
    });
    if (ormUser === undefined) return null;
    return Uuid.fromExisting(ormUser.id);
  }

  async saveNewUser(user: User): Promise<void> {
    await this.userRepository.save({
      id: user.id.val,
      email: user.email.val,
      hashedPassword: user.hashedPassword.val,
      username: user.username.val,
    });
    await this.playerRepository.save({
      id: user.player.id.val,
      gold: user.player.gold,
      user: { id: user.id.val },
    });
    await this.avatarRepository.save({
      id: user.player.avatar.id.val,
      name: user.player.avatar.name,
      currentExperience: user.player.avatar.currentExperience,
      color: user.player.avatar.color,
      attack: user.player.avatar.attack,
      defense: user.player.avatar.defense,
      health: user.player.avatar.health,
      level: user.player.avatar.level,
      race: user.player.avatar.race,
      player: { id: user.player.id.val },
    });
  }
}
