import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminAddEquipmentInteractor } from './adapter/interactor/admin-add-equipment.interactor';
import { AdminAddEquipmentRepository } from './adapter/interface/admin-add-equipment.repository';
import { AdminAddEquipmentTypeOrmMySqlRepository } from './infrastructure/admin-add-equipment.typeorm.mysql.repository';
import { AdminEquipmentAddRoute } from './presentation/admin-equipment-add.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AdminAddEquipmentInteractor,
    {
      provide: AdminAddEquipmentRepository,
      useClass: AdminAddEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [AdminEquipmentAddRoute],
})
export class AdminAddEquipmentsModule {}
