import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EditEnemyInteractor } from './adapter/interactor/edit-enemy.interactor';
import { EditEnemyRepository } from './adapter/interface/edit-enemy.repository';
import { EditEnemyRepositoryTypeOrmMySqlRepository } from './infrastructure/edit-enemy.typeorm.mysql.repository';
import { EnemyEditRoute } from './presentation/enemy-edit.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    EditEnemyInteractor,
    {
      provide: EditEnemyRepository,
      useClass: EditEnemyRepositoryTypeOrmMySqlRepository,
    },
  ],
  controllers: [EnemyEditRoute],
})
export class AdminEditEnemyModule {}
