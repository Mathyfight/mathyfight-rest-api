import { Module } from '@nestjs/common';
import { AdminCoreModule } from 'src/admin/core/admin-core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AdminEditMathProblemInteractor } from './adapter/interactor/admin-edit-math-problem.interactor';
import { AdminEditMathProblemRepository } from './adapter/interface/admin-edit-math-problem.repository';
import { AdminEditMathProblemTypeOrmMySqlRepository } from './infrastructure/admin-edit-math-problem.typeorm.mysql.repository';
import { AdminMathProblemEditRoute } from './presentation/admin-math-problem-edit.route';

@Module({
  imports: [DatabaseModule, AdminCoreModule],
  providers: [
    AdminEditMathProblemInteractor,
    {
      provide: AdminEditMathProblemRepository,
      useClass: AdminEditMathProblemTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathProblemEditRoute],
})
export class AdminEditMathProblemModule {}
