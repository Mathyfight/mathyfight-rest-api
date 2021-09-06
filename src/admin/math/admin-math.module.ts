import { Module } from '@nestjs/common';
import { AdminMathAreaModule } from './math-area/admin-math-area.module';
import { AdminMathProblemModule } from './math-problem/admin-math-problem.module';
import { AdminMathTopicModule } from './math-topic/admin-math-topic.module';

@Module({
  imports: [AdminMathAreaModule, AdminMathTopicModule, AdminMathProblemModule],
})
export class AdminMathModule {}
