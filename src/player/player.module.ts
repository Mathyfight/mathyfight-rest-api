import { Module } from '@nestjs/common';
import { GetEquipmentsModule } from './get-equipments/get-equipments.module';

@Module({
  imports: [GetEquipmentsModule],
})
export class PlayerModule {}
