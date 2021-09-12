import { Module } from '@nestjs/common';
import { AdminCoreModule } from 'src/admin/core/admin-core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AdminAddMathProblemInteractor } from './adapter/interactor/admin-add-math-problem.interactor';
import { AdminAddMathProblemRepository } from './adapter/interface/admin-add-math-problem.repository';
import { AdminAddMathProblemTypeOrmMySqlRepository } from './infrastructure/admin-add-math-problem.typeorm.mysql.repository';
import { AdminMathProblemAddRoute } from './presentation/admin-math-problem-add.route';

@Module({
  imports: [DatabaseModule, AdminCoreModule],
  providers: [
    AdminAddMathProblemInteractor,
    {
      provide: AdminAddMathProblemRepository,
      useClass: AdminAddMathProblemTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathProblemAddRoute],
})
export class AdminAddMathProblemModule {}
