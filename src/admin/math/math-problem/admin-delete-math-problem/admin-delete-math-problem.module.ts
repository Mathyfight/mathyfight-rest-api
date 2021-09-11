import { Module } from '@nestjs/common';
import { AdminCoreModule } from 'src/admin/core/admin-core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AdminDeleteMathProblemInteractor } from './adapter/interactor/admin-delete-math-problem.interactor';
import { AdminDeleteMathProblemRepository } from './adapter/interface/admin-delete-math-problem.repository';
import { AdminDeleteMathProblemTypeOrmMySqlRepository } from './infrastructure/admin-delete-math-problem.typeorm.mysql.repository';
import { AdminMathProblemDeleteRoute } from './presentation/admin-math-problem-delete.route';

@Module({
  imports: [DatabaseModule, AdminCoreModule],
  providers: [
    AdminDeleteMathProblemInteractor,
    {
      provide: AdminDeleteMathProblemRepository,
      useClass: AdminDeleteMathProblemTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathProblemDeleteRoute],
})
export class AdminDeleteMathProblemModule {}
