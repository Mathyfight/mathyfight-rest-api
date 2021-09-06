import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminGetMathProblemsByTopicInteractor } from './adapter/interactor/admin-get-math-problems-by-topic.interactor';
import { AdminGetMathProblemsByTopicRepository } from './adapter/interface/admin-get-math-problems-by-topic.repository';
import { AdminGetMathProblemsByTopicTypeOrmMySqlRepository } from './infrastructure/admin-get-math-problems-by-topic.typeorm.mysql.repository';
import { AdminMathTopicProblemsGetRoute } from './presentation/admin-math-topic-problems-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminGetMathProblemsByTopicInteractor,
    {
      provide: AdminGetMathProblemsByTopicRepository,
      useClass: AdminGetMathProblemsByTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathTopicProblemsGetRoute],
})
export class AdminGetMathProblemsByTopicModule {}
