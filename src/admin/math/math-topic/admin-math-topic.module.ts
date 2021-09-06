import { Module } from '@nestjs/common';
import { AdminAddMathTopicModule } from './admin-add-math-topic/admin-add-math-topic.module';
import { AdminDeleteMathTopicModule } from './admin-delete-math-topic/admin-delete-math-topic.module';
import { AdminEditMathTopicModule } from './admin-edit-math-topic/admin-edit-math-topic.module';
import { AdminGetMathTopicModule } from './admin-get-math-topic/admin-get-math-topic.module';

@Module({
  imports: [
    AdminDeleteMathTopicModule,
    AdminAddMathTopicModule,
    AdminEditMathTopicModule,
    AdminGetMathTopicModule,
  ],
})
export class AdminMathTopicModule {}
