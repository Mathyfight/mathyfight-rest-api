import { Module } from '@nestjs/common';
import { AdminAddEquipmentsModule } from './admin-add-equipment/admin-add-equipment.module';
import { AdminEditEquipmentsModule } from './admin-edit-equipment/admin-edit-equipment.module';
import { AdminGetEquipmentsModule } from './admin-get-equipments/admin-get-equipments.module';

@Module({
  imports: [
    AdminGetEquipmentsModule,
    AdminAddEquipmentsModule,
    AdminEditEquipmentsModule,
  ],
})
export class AdminEquipmentModule {}
