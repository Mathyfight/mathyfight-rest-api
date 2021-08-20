import { Module } from '@nestjs/common';
import { GetGeneralInfoModule } from './get-general-info/get-general-info.module';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';
import { SellEquipmentModule } from './sell-equipment/sell-equipment.module';
import { GetPlayerProfileModule } from './get-player-profile/get-player-profile.module';

@Module({
  imports: [
    GetEquipmentsModule,
    SellEquipmentModule,
    GetGeneralInfoModule,
    GetPlayerProfileModule,
  ],
})
export class PlayerModule {}
