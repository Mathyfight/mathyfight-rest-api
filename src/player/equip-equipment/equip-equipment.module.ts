import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EquipEquipmentInteractor } from './adapter/interactor/equip-equipment.interactor';
import { EquipEquipmentRepository } from './adapter/interface/equip-equipment.repository';
import { EquipEquipmentTypeOrmMySqlRepository } from './infrastructure/equip-equipment.typeorm.mysql.repository';
import { PlayerEquipEquipmentRoute } from './presentation/player-equip-equipment.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    EquipEquipmentInteractor,
    {
      provide: EquipEquipmentRepository,
      useClass: EquipEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerEquipEquipmentRoute],
})
export class PlayerEquipEquipmentModule {}
