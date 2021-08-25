import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetMathDifficultiesInteractor } from './adapter/interactor/get-math-difficulties.interactor';
import { GetMathDifficultiesRepository } from './adapter/interface/get-math-difficulties.repository';
import { GetMathDifficultiesTypeOrmMySqlRepository } from './infrastructure/get-math-difficulties.typeorm.mysql.repository';
import { MathGetDifficultiesRoute } from './presentation/math-get-difficulties.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetMathDifficultiesInteractor,
    {
      provide: GetMathDifficultiesRepository,
      useClass: GetMathDifficultiesTypeOrmMySqlRepository,
    },
  ],
  controllers: [MathGetDifficultiesRoute],
})
export class GetMathDifficultiesModule {}
