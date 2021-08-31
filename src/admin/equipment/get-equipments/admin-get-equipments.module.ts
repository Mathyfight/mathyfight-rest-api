import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminGetEquipmentsInteractor } from './adapter/interactor/admin-get-equipments.interactor';
import { AdminGetEquipmentsRepository } from './adapter/interface/admin-get-equipments.repository';
import { AdminGetEquipmentsTypeOrmMySqlRepository } from './infrastructure/admin-get-equipments.typeorm.mysql.repository';
import { AdminEquipmentsGetRoute } from './presentation/admin-equipments-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminGetEquipmentsInteractor,
    {
      provide: AdminGetEquipmentsRepository,
      useClass: AdminGetEquipmentsTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminEquipmentsGetRoute],
})
export class AdminGetEquipmentsModule {}
