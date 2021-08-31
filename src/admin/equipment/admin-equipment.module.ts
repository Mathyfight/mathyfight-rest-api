import { Module } from '@nestjs/common';
import { AdminAddEquipmentsModule } from './admin-add-equipment/admin-add-equipment.module';
import { AdminGetEquipmentsModule } from './admin-get-equipments/admin-get-equipments.module';

@Module({
  imports: [AdminGetEquipmentsModule, AdminAddEquipmentsModule],
})
export class AdminEquipmentModule {}
