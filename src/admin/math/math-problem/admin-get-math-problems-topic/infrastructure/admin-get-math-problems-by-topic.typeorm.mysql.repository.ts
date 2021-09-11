import { InjectRepository } from '@nestjs/typeorm';
import { MathProblemTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-problem.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminGetMathProblemsByTopicRepository } from '../adapter/interface/admin-get-math-problems-by-topic.repository';
import { MathProblem } from '../domain/entity/math-problem';
import { User } from '../domain/entity/user';

export class AdminGetMathProblemsByTopicTypeOrmMySqlRepository
  implements AdminGetMathProblemsByTopicRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathProblemTypeOrmMySql)
    private readonly mathProblemRepository: Repository<MathProblemTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async getMathProblemsByTopic(mathTopicId: string): Promise<MathProblem[]> {
    const ormMathProblems = await this.mathProblemRepository.find({
      where: { mathTopic: { id: mathTopicId } },
      relations: ['difficulty'],
    });
    return ormMathProblems.map(
      (p) =>
        new MathProblem(p.id, p.description, p.difficulty.name, p.imageUrl),
    );
  }
}
