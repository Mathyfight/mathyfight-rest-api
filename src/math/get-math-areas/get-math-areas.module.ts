import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetMathAreasInteractor } from './adapter/interactor/get-math-areas.interactor';
import { GetMathAreasRepository } from './adapter/interface/get-math-areas.repository';
import { GetMathAreasTypeOrmMySqlRepository } from './infrastructure/get-math-areas.typeorm.mysql.repository';
import { MathGetAreasRoute } from './presentation/math-get-areas.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetMathAreasInteractor,
    {
      provide: GetMathAreasRepository,
      useClass: GetMathAreasTypeOrmMySqlRepository,
    },
  ],
  controllers: [MathGetAreasRoute],
})
export class GetMathAreasModule {}
