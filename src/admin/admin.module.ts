import { Module } from '@nestjs/common';
import { AdminCoreModule } from './core/admin-core.module';
import { AdminEnemyModule } from './enemy/admin-enemy.module';
import { AdminEquipmentModule } from './equipment/admin-equipment.module';
import { AdminMathModule } from './math/admin-math.module';

@Module({
  imports: [
    AdminCoreModule,
    AdminMathModule,
    AdminEnemyModule,
    AdminEquipmentModule,
  ],
})
export class AdminModule {}
