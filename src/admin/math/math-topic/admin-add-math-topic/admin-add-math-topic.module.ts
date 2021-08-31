import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminAddMathTopicInteractor } from './adapter/interactor/admin-add-math-topic.interactor';
import { AdminAddMathTopicRepository } from './adapter/interface/admin-add-math-topic.repository';
import { AdminAddMathTopicTypeOrmMySqlRepository } from './infrastructure/admin-add-math-topic.typeorm.mysql.repository';
import { AdminMathTopicAddRoute } from './presentation/admin-math-topic-add.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminAddMathTopicInteractor,
    {
      provide: AdminAddMathTopicRepository,
      useClass: AdminAddMathTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathTopicAddRoute],
})
export class AdminAddMathTopicModule {}
