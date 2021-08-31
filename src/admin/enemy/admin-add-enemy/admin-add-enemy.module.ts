import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AddEnemyInteractor } from './adapter/interactor/add-enemy.interactor';
import { AddEnemyRepository } from './adapter/interface/add-enemy.repository';
import { AddEnemyRepositoryTypeOrmMySqlRepository } from './infrastructure/add-enemy.typeorm.mysql.repository';
import { EnemyAddRoute } from './presentation/enemy-add.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddEnemyInteractor,
    {
      provide: AddEnemyRepository,
      useClass: AddEnemyRepositoryTypeOrmMySqlRepository,
    },
  ],
  controllers: [EnemyAddRoute],
})
export class AdminAddEnemyModule {}
