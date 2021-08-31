import { Module } from '@nestjs/common';
import { AdminMathAreaModule } from './math-area/admin-math-area.module';
import { AdminMathTopicModule } from './math-topic/admin-math-topic.module';

@Module({
  imports: [AdminMathAreaModule, AdminMathTopicModule],
})
export class AdminMathModule {}
