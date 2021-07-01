import { Module } from '@nestjs/common';
import { GetGeneralInfoModule } from './get-general-info/get-general-info.module';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';
import { SellEquipmentModule } from './sell-equipment/sell-equipment.module';
import { UpgradeEquipmentModule } from './upgrade-equipment/upgrade-equipment.module';

@Module({
  imports: [
    GetEquipmentsModule,
    SellEquipmentModule,
    GetGeneralInfoModule,
    UpgradeEquipmentModule,
  ],
})
export class PlayerModule {}
