import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SellEquipmentRepository } from './adapter/interface/sell-equipment.repository';
import { SellEquipmentInteractor } from './adapter/interactor/sell-equipment.interactor';
import { SellEquipmentTypeOrmMySqlRepository } from './infrastructure/sell-equipment.typeorm.mysql.repository';
import { PlayerSellEquipmentRoute } from './presentation/player-sell-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    SellEquipmentInteractor,
    {
      provide: SellEquipmentRepository,
      useClass: SellEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerSellEquipmentRoute],
})
export class SellEquipmentModule {}
