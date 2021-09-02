import { InjectRepository } from '@nestjs/typeorm';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminGetMathTopicRepository } from '../adapter/interface/admin-get-math-topic.repository';
import { Level } from '../domain/entity/level';
import { MathTopic } from '../domain/entity/math-topic';
import { User } from '../domain/entity/user';

export class AdminGetMathTopicTypeOrmMySqlRepository
  implements AdminGetMathTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicTypeOrmMySql)
    private readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async getMathTopicById(mathTopicId: string): Promise<MathTopic | null> {
    const ormMathTopic = await this.mathTopicRepository.findOne(mathTopicId, {
      relations: [
        'mathTopicLevels',
        'mathTopicLevels.level',
        'mathTopicLevels.enemy',
      ],
    });
    if (ormMathTopic === undefined) return null;
    return new MathTopic(
      ormMathTopic.id,
      ormMathTopic.name,
      ormMathTopic.description,
      ormMathTopic.imageUrl,
      ormMathTopic.mathTopicLevels.map(
        (l) => new Level(l.level.number, l.enemy.name, l.enemy.imageUrl),
      ),
    );
  }
}
