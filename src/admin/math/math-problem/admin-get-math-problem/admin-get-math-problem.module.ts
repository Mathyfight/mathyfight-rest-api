import { Module } from '@nestjs/common';
import { AdminCoreModule } from 'src/admin/core/admin-core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AdminGetMathProblemInteractor } from './adapter/interactor/admin-get-math-problem.interactor';
import { AdminGetMathProblemRepository } from './adapter/interface/admin-get-math-problem.repository';
import { AdminGetMathProblemTypeOrmMySqlRepository } from './infrastructure/admin-get-math-problem.typeorm.repository';
import { AdminMathProblemGetRoute } from './presentation/admin-math-problem-get.route';

@Module({
  imports: [DatabaseModule, AdminCoreModule],
  providers: [
    AdminGetMathProblemInteractor,
    {
      provide: AdminGetMathProblemRepository,
      useClass: AdminGetMathProblemTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathProblemGetRoute],
})
export class AdminGetMathProblemModule {}
