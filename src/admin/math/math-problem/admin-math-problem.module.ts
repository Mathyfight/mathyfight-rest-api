import { Module } from '@nestjs/common';
import { AdminGetMathProblemModule } from './admin-get-math-problem/admin-get-math-problem.module';
import { AdminGetMathProblemsByTopicModule } from './admin-get-math-problems-topic/admin-get-math-problems-by-topic.module';

@Module({
  imports: [AdminGetMathProblemsByTopicModule, AdminGetMathProblemModule],
})
export class AdminMathProblemModule {}
