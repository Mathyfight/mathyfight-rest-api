import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetEquipmentsRepository } from './application/adapter/get-equipments.repository';
import { GetEquipmentsAppService } from './application/service/get-equipments.app.service';
import { GetEquipmentTypeOrmMySqlRepository } from './infrastructure/get-equipments.typeorm.mysql.repository';
import { GetEquipmentsRoute } from './presentation/get-equipments.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetEquipmentsAppService,
    {
      provide: GetEquipmentsRepository,
      useClass: GetEquipmentTypeOrmMySqlRepository,
    },
  ],
  controllers: [GetEquipmentsRoute],
})
export class GetEquipmentsModule {}
