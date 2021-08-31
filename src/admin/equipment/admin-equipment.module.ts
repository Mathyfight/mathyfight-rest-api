import { Module } from '@nestjs/common';
import { AdminAddEquipmentsModule } from './add-equipment/add-equipment.module';
import { AdminGetEquipmentsModule } from './get-equipments/admin-get-equipments.module';

@Module({
  imports: [AdminGetEquipmentsModule, AdminAddEquipmentsModule],
})
export class AdminEquipmentModule {}
