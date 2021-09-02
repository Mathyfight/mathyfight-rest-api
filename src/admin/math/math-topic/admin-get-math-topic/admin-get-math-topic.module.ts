import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminGetMathTopicInteractor } from './adapter/interactor/admin-get-math-topic.interactor';
import { AdminGetMathTopicRepository } from './adapter/interface/admin-get-math-topic.repository';
import { AdminGetMathTopicTypeOrmMySqlRepository } from './infrastructure/admin-get-math-topic.typeorm.mysql.repository';
import { AdminMathTopicGetRoute } from './presentation/admin-math-topic-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminGetMathTopicInteractor,
    {
      provide: AdminGetMathTopicRepository,
      useClass: AdminGetMathTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathTopicGetRoute],
})
export class AdminGetMathtopicModule {}
