import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UpgradeEquipmentRepository } from './application/adapter/upgrade-equipment.repository';
import { UpgradeEquipmentAppService } from './application/service/upgrade-equipment.app.service';
import { UpgradeEquipmentTypeOrmMySqlRepository } from './infrastructure/upgrade-equipment.typeorm.mysql.repository';
import { UpgradeEquipmentRoute } from './presentation/upgrade-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpgradeEquipmentAppService,
    {
      provide: UpgradeEquipmentRepository,
      useClass: UpgradeEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [UpgradeEquipmentRoute],
})
export class UpgradeEquipmentModule {}
