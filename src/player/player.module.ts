import { Module } from '@nestjs/common';
import { GetGeneralInfoModule } from './get-general-info/get-general-info.module';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';
import { SellEquipmentModule } from './sell-equipment/sell-equipment.module';

@Module({
  imports: [GetEquipmentsModule, SellEquipmentModule, GetGeneralInfoModule],
})
export class PlayerModule {}
