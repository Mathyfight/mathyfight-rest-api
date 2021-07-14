import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BuyEquipmentRepository } from './adapter/interface/buy-equipment.repository';
import { BuyEquipmentInteractor } from './adapter/interactor/buy-equipment.interactor';
import { BuyEquipmentTypeOrmMySqlRepository } from './infrastructure/buy-equipment.typeorm.mysql.repository';
import { StoreBuyEquipmentRoute } from './presentation/store-buy-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    BuyEquipmentInteractor,
    {
      provide: BuyEquipmentRepository,
      useClass: BuyEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [StoreBuyEquipmentRoute],
})
export class BuyEquipmentModule {}
