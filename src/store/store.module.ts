import { Module } from '@nestjs/common';
import { EquipmentsModule } from './get-equipments/equipments.module';

@Module({
  imports: [EquipmentsModule],
})
export class StoreModule {}
