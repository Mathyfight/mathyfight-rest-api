import { InjectRepository } from '@nestjs/typeorm';
import { MathAreaTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-area.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminGetMathAreasRepository } from '../adapter/interface/admin-get-math-areas.repository';
import { MathArea } from '../domain/entity/math-area';
import { MathTopic } from '../domain/entity/math-topic';
import { User } from '../domain/entity/user';

export class AdminGetMathAreasTypeOrmMySqlRepository
  implements AdminGetMathAreasRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathAreaTypeOrmMySql)
    private readonly mathAreaRepository: Repository<MathAreaTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async getMathAreas(): Promise<MathArea[]> {
    const ormMathAreas = await this.mathAreaRepository.find({
      relations: [
        'mathTopics',
        'mathTopics.mathTopicLevels',
        'mathTopics.mathTopicLevels.enemy',
      ],
    });
    return ormMathAreas.map(
      (ma) =>
        new MathArea(
          ma.id,
          ma.name,
          ma.mathTopics.map((mt) => new MathTopic(mt.id, mt.name, mt.imageUrl)),
        ),
    );
  }
}
