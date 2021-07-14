import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetGeneralInfoRepository } from '../adapter/interface/get-general-info.repository';
import { Experience } from '../domain/entity/experience';
import { GeneralInfo } from '../domain/entity/general-info';

export class GetGeneralInfoTypeOrmMySqlRepository
  implements GetGeneralInfoRepository
{
  constructor(
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
  ) {}

  async getGeneralInfoByUserId(userId: string): Promise<GeneralInfo | null> {
    const ormAvatar = await this.avatarRepository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.player', 'p')
      .where('p.user_id = :userId', { userId })
      .getOne();
    if (ormAvatar === undefined) return null;
    return new GeneralInfo(
      ormAvatar.player.gold,
      new Experience(ormAvatar.level, ormAvatar.currentExperience),
    );
  }
}
