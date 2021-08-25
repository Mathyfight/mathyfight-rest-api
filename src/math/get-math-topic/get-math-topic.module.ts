import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetMathTopicInteractor } from './adapter/interactor/get-math-topic.interactor';
import { GetMathTopicRepository } from './adapter/interface/get-math-topic.repository';
import { GetMathTopicTypeOrmMySqlRepository } from './infrastructure/get-math-topic.typeorm.mysql.repository';
import { MathGetTopicRoute } from './presentation/math-get-topic.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetMathTopicInteractor,
    {
      provide: GetMathTopicRepository,
      useClass: GetMathTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [MathGetTopicRoute],
})
export class GetMathTopicModule {}
