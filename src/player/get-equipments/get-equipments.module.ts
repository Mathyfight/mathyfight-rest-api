import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetEquipmentsRepository } from './application/adapter/get-equipments.repository';
import { GetEquipmentsAppService } from './application/service/get-equipments.app.service';
import { GetEquipmentTypeOrmMySqlRepository } from './infrastructure/get-equipments.typeorm.mysql.repository';
import { PlayerGetEquipmentsRoute } from './presentation/player-get-equipments.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetEquipmentsAppService,
    {
      provide: GetEquipmentsRepository,
      useClass: GetEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetEquipmentsRoute],
})
export class GetEquipmentsModule {}
