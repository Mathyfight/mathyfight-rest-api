import { Module } from '@nestjs/common';
import { GetGeneralInfoModule } from './get-general-info/get-general-info.module';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';
import { SellEquipmentModule } from './sell-equipment/sell-equipment.module';
import { GetPlayerAvatarModule } from './get-player-avatar/get-player-avatar.module';
import { PlayerUpdateAvatarModule } from './update-player-avatar/update-player-avatar.module';
import { PlayerEquipEquipmentModule } from './equip-equipment/equip-equipment.module';
import { GetPlayerProfileModule } from './get-player-profile/get-player-profile.module';
import { SearchPlayerModule } from './search-player/search-player.module';
import { GetPlayerStatisticsModule } from './get-player-statistics/get-player-statistics.module';

@Module({
  imports: [
    GetEquipmentsModule,
    SellEquipmentModule,
    GetGeneralInfoModule,
    GetPlayerAvatarModule,
    PlayerUpdateAvatarModule,
    PlayerEquipEquipmentModule,
    GetPlayerProfileModule,
    SearchPlayerModule,
    GetPlayerStatisticsModule,
    GetPlayerAvatarModule,
    PlayerEquipEquipmentModule,
  ],
})
export class PlayerModule {}
