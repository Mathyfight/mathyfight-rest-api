import { InjectRepository } from '@nestjs/typeorm';
import { MathAreaTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-area.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetMathAreasRepository } from '../adapter/interface/get-math-areas.repository';
import { MathArea } from '../domain/entity/math-area';

export class GetMathAreasTypeOrmMySqlRepository
  implements GetMathAreasRepository
{
  constructor(
    @InjectRepository(MathAreaTypeOrmMySql)
    readonly mathAreaRepository: Repository<MathAreaTypeOrmMySql>,
  ) {}

  async getMathAreas(): Promise<MathArea[]> {
    const ormMathAreas = await this.mathAreaRepository.find();
    return ormMathAreas.map(
      (ma) => new MathArea(ma.id, ma.name, ma.description, ma.imageUrl),
    );
  }
}
