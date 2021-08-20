import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { RaceTypeOrmMySql } from 'src/database/typeorm/mysql/entity/race.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { UpdatePlayerAvatarRepository } from '../adapter/interface/update-player-avatar.repository';
import { UpdatePlayerAvatarCommand } from '../domain/command/update-player-avatar.command';
import { Avatar } from '../domain/entity/avatar';
import { Race } from '../domain/entity/race';
import { User } from '../domain/entity/user';

export class UpdatePlayerAvatarTypeOrmMySqlRepository
  implements UpdatePlayerAvatarRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(RaceTypeOrmMySql)
    private readonly raceRepository: Repository<RaceTypeOrmMySql>,
    private readonly connection: Connection,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.id,
      ormUser.player === null ? null : new Avatar(ormUser.player.avatar.id),
    );
  }

  async getRaceById(raceId: string): Promise<Race | null> {
    const ormRace = await this.raceRepository.findOne(raceId);
    if (ormRace === undefined) return null;
    return new Race(ormRace.id);
  }

  async updatePlayerAvatar(cmd: UpdatePlayerAvatarCommand): Promise<void> {
    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      const ormAttributes: any = {};
      if (cmd.color !== undefined) ormAttributes.color = cmd.color;
      if (cmd.raceId !== undefined) ormAttributes.race = { id: cmd.raceId };
      await manager.update(AvatarTypeOrmMySql, cmd.avatarId, ormAttributes);
    });
  }
}
