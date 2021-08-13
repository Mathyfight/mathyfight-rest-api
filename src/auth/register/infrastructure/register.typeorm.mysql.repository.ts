import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { PlayerTypeOrmMySql } from 'src/database/typeorm/mysql/entity/player.typeorm.mysql';
import { RaceTypeOrmMySql } from 'src/database/typeorm/mysql/entity/race.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { RegisterRepository } from '../adapter/interface/register.repository';
import { RegisterCommand } from '../domain/command/register.command';

export class RegisterTypeOrmMySqlRepository implements RegisterRepository {
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(RaceTypeOrmMySql)
    readonly raceRepository: Repository<RaceTypeOrmMySql>,
    @InjectRepository(MathTopicLevelTypeOrmMySql)
    readonly mathTopicLevelRepository: Repository<MathTopicLevelTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async getMathTopicLevelIdsByNumber(number: number): Promise<string[]> {
    const ormMathTopicLevelsZero = await this.mathTopicLevelRepository
      .createQueryBuilder('mtl')
      .innerJoin('mtl.level', 'l')
      .where('l.number = :levelNumber', { levelNumber: number })
      .getMany();
    return ormMathTopicLevelsZero.map((l) => l.id);
  }

  async getDefaultAvatarRaceId(): Promise<string> {
    const ormRace = await this.raceRepository.findOne();
    return ormRace!.id;
  }

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
        isAdmin: cmd.registerNewUser.isAdmin,
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
        baseAttack: cmd.registerNewUser.player.avatar.attack,
        baseDefense: cmd.registerNewUser.player.avatar.defense,
        maxHealth: cmd.registerNewUser.player.avatar.health,
        level: cmd.registerNewUser.player.avatar.level,
        race: { id: cmd.registerNewUser.player.avatar.raceId },
        player: { id: cmd.registerNewUser.player.id },
      });
      await manager.insert(
        PlayerUnlockedMathTopicLevelTypeOrmMySql,
        cmd.registerNewUser.player.unlockedLevels.map((ul) => ({
          id: ul.id,
          player: { id: cmd.registerNewUser.player.id },
          mathTopicLevel: { id: ul.mathTopicLevelId },
        })),
      );
    });
  }
}
