import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DeleteEnemyInteractor } from './adapter/interactor/delete-enemy.interactor';
import { DeleteEnemyRespository } from './adapter/interface/delete-enemy.respository';
import { DeleteEnemyRepositoryTypeOrmMySqlRepository } from './infrastructure/delete-enemy.typeorm.mysql.repository';
import { EnemyDeleteRoute } from './presentation/enemy-delete.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    DeleteEnemyInteractor,
    {
      provide: DeleteEnemyRespository,
      useClass: DeleteEnemyRepositoryTypeOrmMySqlRepository,
    },
  ],
  controllers: [EnemyDeleteRoute],
})
export class AdminDeleteEnemyModule {}
