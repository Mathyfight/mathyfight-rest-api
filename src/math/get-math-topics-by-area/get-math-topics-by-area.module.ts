import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetMathTopicsByAreaInteractor } from './adapter/interactor/get-math-topics-by-area.interactor';
import { GetMathTopicsByAreaRepository } from './adapter/interface/get-math-topics-by-area.repository';
import { GetMathTopicsByAreaTypeOrmMySqlRepository } from './infrastructure/get-math-topics-by-area.typeorm.mysql.repository';
import { MathGetTopicsByAreaRoute } from './presentation/math-get-topics-by-area.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetMathTopicsByAreaInteractor,
    {
      provide: GetMathTopicsByAreaRepository,
      useClass: GetMathTopicsByAreaTypeOrmMySqlRepository,
    },
  ],
  controllers: [MathGetTopicsByAreaRoute],
})
export class GetMathTopicsByAreaModule {}
