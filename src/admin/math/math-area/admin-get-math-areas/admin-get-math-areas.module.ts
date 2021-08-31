import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminGetMathAreasInteractor } from './adapter/interactor/admin-get-math-areas.interactor';
import { AdminGetMathAreasRepository } from './adapter/interface/admin-get-math-areas.repository';
import { AdminGetMathAreasTypeOrmMySqlRepository } from './infrastructure/admin-get-math-areas.typeorm.mysql.repository';
import { AdminMathGetAreasRoute } from './presentation/admin-math-get-areas.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminGetMathAreasInteractor,
    {
      provide: AdminGetMathAreasRepository,
      useClass: AdminGetMathAreasTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminMathGetAreasRoute],
})
export class AdminGetMathAreasModule {}
