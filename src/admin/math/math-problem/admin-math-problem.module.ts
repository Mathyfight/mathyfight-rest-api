import { Module } from '@nestjs/common';
import { AdminGetMathProblemsByTopicModule } from './admin-get-math-problems-topic/admin-get-math-problems-by-topic.module';

@Module({
  imports: [AdminGetMathProblemsByTopicModule],
})
export class AdminMathProblemModule {}
