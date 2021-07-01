import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SellEquipmentRepository } from './application/adapter/sell-equipment.repository';
import { SellEquipmentAppService } from './application/service/sell-equipment.app.service';
import { SellEquipmentTypeOrmMySqlRepository } from './infrastructure/sell-equipment.typeorm.mysql.repository';
import { PlayerSellEquipmentRoute } from './presentation/player-sell-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    SellEquipmentAppService,
    {
      provide: SellEquipmentRepository,
      useClass: SellEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerSellEquipmentRoute],
})
export class SellEquipmentModule {}
