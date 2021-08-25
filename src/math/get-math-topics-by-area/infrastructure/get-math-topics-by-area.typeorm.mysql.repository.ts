import { InjectRepository } from '@nestjs/typeorm';
import { MathTopicTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetMathTopicsByAreaRepository } from '../adapter/interface/get-math-topics-by-area.repository';
import { MathTopic } from '../domain/entity/math-topic';

export class GetMathTopicsByAreaTypeOrmMySqlRepository
  implements GetMathTopicsByAreaRepository
{
  constructor(
    @InjectRepository(MathTopicTypeOrmMySql)
    readonly mathTopicRepository: Repository<MathTopicTypeOrmMySql>,
  ) {}

  async getMathTopicsByMathAreaId(mathAreaId: string): Promise<MathTopic[]> {
    const ormMathTopics = await this.mathTopicRepository.find({
      where: { mathArea: { id: mathAreaId } },
    });
    return ormMathTopics.map(
      (mt) => new MathTopic(mt.id, mt.name, mt.description, mt.imageUrl),
    );
  }
}
