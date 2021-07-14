import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UpgradeEquipmentRepository } from './adapter/interface/upgrade-equipment.repository';
import { UpgradeEquipmentInteractor } from './adapter/interactor/upgrade-equipment.interactor';
import { UpgradeEquipmentTypeOrmMySqlRepository } from './infrastructure/upgrade-equipment.typeorm.mysql.repository';
import { PlayerUpgradeEquipmentRoute } from './presentation/player-upgrade-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpgradeEquipmentInteractor,
    {
      provide: UpgradeEquipmentRepository,
      useClass: UpgradeEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerUpgradeEquipmentRoute],
})
export class UpgradeEquipmentModule {}
