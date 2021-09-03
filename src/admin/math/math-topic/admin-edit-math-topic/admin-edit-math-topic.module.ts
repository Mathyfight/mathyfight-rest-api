import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminEditMathTopicInterator } from './adapter/interactor/admin-edit-math-topic.interactor';
import { AdminEditMathTopicRepository } from './adapter/interface/admin-edit-math-topic.repository';
import { AdminEditMathTopicTypeOrmMySqlRepository } from './infrastructure/admin-edit-math-topic.typeorm.mysql.repository';
import { AdminMathTopicEditRoute } from './presentation/admin-math-topic-edit.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminEditMathTopicInterator,
    {
      provide: AdminEditMathTopicRepository,
      useClass: AdminEditMathTopicTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathTopicEditRoute],
})
export class AdminEditMathTopicModule {}
