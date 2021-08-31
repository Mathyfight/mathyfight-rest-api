import { Module } from '@nestjs/common';
import { AdminAddEnemyModule } from './admin-add-enemy/admin-add-enemy.module';
import { AdminEditEnemyModule } from './admin-edit-enemy/admin-edit-enemy.module';
import { AdminDeleteEnemyModule } from './admin-delete-enemy/admin-delete-enemy.module';
import { AdminGetEnemyModule } from './admin-get-enemies/admin-get-enemy.module';

@Module({
  imports: [
    AdminAddEnemyModule,
    AdminEditEnemyModule,
    AdminDeleteEnemyModule,
    AdminGetEnemyModule,
  ],
})
export class AdminEnemyModule {}
