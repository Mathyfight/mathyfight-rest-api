import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminEditEquipmentInteractor } from './adapter/interactor/admin-edit-equipment.interactor';
import { AdminEditEquipmentRepository } from './adapter/interface/admin-edit-equipment.repository';
import { AdminEditEquipmentTypeOrmMySqlRepository } from './infrastructure/admin-edit-equipment.typeorm.mysql.repository';
import { AdminEquipmentEditRoute } from './presentation/admin-equipment-edit.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminEditEquipmentInteractor,
    {
      provide: AdminEditEquipmentRepository,
      useClass: AdminEditEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminEquipmentEditRoute],
})
export class AdminEditEquipmentsModule {}
