import { Module } from '@nestjs/common';
import { AdminMathAreaModule } from './math-area/admin-math-area.module';
import { AdminGetMathtopicModule } from './math-topic/admin-get-math-topic/admin-get-math-topic.module';
import { AdminMathTopicModule } from './math-topic/admin-math-topic.module';

@Module({
  imports: [AdminMathAreaModule, AdminMathTopicModule, AdminGetMathtopicModule],
})
export class AdminMathModule {}
