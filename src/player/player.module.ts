import { Module } from '@nestjs/common';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';
import { SellEquipmentModule } from './sell-equipment/sell-equipment.module';

@Module({
  imports: [GetEquipmentsModule, SellEquipmentModule],
})
export class PlayerModule {}
