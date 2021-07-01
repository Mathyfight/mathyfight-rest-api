import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BuyEquipmentRepository } from './application/adapter/buy-equipment.repository';
import { BuyEquipmentAppService } from './application/service/buy-equipment.app.service';
import { BuyEquipmentTypeOrmMySqlRepository } from './infrastructure/buy-equipment.typeorm.mysql.repository';
import { StoreBuyEquipmentRoute } from './presentation/store-buy-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    BuyEquipmentAppService,
    {
      provide: BuyEquipmentRepository,
      useClass: BuyEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [StoreBuyEquipmentRoute],
})
export class BuyEquipmentModule {}
