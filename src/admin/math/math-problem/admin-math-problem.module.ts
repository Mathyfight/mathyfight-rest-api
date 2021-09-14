import { Module } from '@nestjs/common';
import { AdminAddMathProblemModule } from './admin-add-math-problem/admin-add-math-problem.module';
import { AdminDeleteMathProblemModule } from './admin-delete-math-problem/admin-delete-math-problem.module';
import { AdminEditMathProblemModule } from './admin-edit-math-problem/admin-edit-math-problem.module';
import { AdminGetMathProblemModule } from './admin-get-math-problem/admin-get-math-problem.module';
import { AdminGetMathProblemsByTopicModule } from './admin-get-math-problems-topic/admin-get-math-problems-by-topic.module';

@Module({
  imports: [
    AdminGetMathProblemsByTopicModule,
    AdminGetMathProblemModule,
    AdminDeleteMathProblemModule,
    AdminAddMathProblemModule,
    AdminEditMathProblemModule,
  ],
})
export class AdminMathProblemModule {}
