import { Module } from '@nestjs/common';
import { BuyEquipmentModule } from './buy-equipment/buy-equipment.module';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';

@Module({
  imports: [GetEquipmentsModule, BuyEquipmentModule],
})
export class StoreModule {}
