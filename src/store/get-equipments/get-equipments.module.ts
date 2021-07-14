import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetEquipmentsRepository } from './adapter/interface/get-equipments.repository';
import { GetEquipmentsInteractor } from './adapter/interactor/get-equipments.interactor';
import { GetEquipmentTypeOrmMySqlRepository } from './infrastructure/get-equipments.typeorm.mysql.repository';
import { StoreGetEquipmentsRoute } from './presentation/store-get-equipments.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetEquipmentsInteractor,
    {
      provide: GetEquipmentsRepository,
      useClass: GetEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [StoreGetEquipmentsRoute],
})
export class GetEquipmentsModule {}
