import { InjectRepository } from '@nestjs/typeorm';
import { DifficultyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/difficulty.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetMathDifficultiesRepository } from '../adapter/interface/get-math-difficulties.repository';
import { MathDifficulty } from '../domain/entity/math-difficulty';

export class GetMathDifficultiesTypeOrmMySqlRepository
  implements GetMathDifficultiesRepository
{
  constructor(
    @InjectRepository(DifficultyTypeOrmMySql)
    private readonly difficultyrepository: Repository<DifficultyTypeOrmMySql>,
  ) {}

  async getMathDifficulties(): Promise<MathDifficulty[]> {
    const ormDifficulties = await this.difficultyrepository.find();
    return ormDifficulties.map(
      (d) => new MathDifficulty(d.id, d.name, d.damageMultiplier, d.maxSeconds),
    );
  }
}
