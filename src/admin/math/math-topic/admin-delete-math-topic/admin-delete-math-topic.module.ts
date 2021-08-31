import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminDeleteMathTopicInteractor } from './adapter/interactor/admin-delete-math-topic.interactor';
import { AdminDeleteMathTopicRepository } from './adapter/interface/admin-delete-math-topic.repository';
import { AdminDeleteMathTopicTypeOrmMySqlRepository } from './infrastructure/admin-delete-math-topic.typeorm.mysql.repository';
import { AdminMathDeleteTopicRoute } from './presentation/admin-math-delete-topic.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminDeleteMathTopicInteractor,
    {
      provide: AdminDeleteMathTopicRepository,
      useClass: AdminDeleteMathTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathDeleteTopicRoute],
})
export class AdminDeleteMathTopicModule {}
