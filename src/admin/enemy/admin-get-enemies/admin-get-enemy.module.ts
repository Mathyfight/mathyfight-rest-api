import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetEnemiesInteractor } from './adapter/interactor/get-enemies.interactor';
import { GetEnemiesRepository } from './adapter/interface/get-enemies.repository';
import { GetEnemiesRepositoryTypeOrmMySqlRepository } from './infrastructure/get-enemies.typeorm.mysql.repository';
import { EnemiesGetRoute } from './presentation/enemies-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetEnemiesInteractor,
    {
      provide: GetEnemiesRepository,
      useClass: GetEnemiesRepositoryTypeOrmMySqlRepository,
    },
  ],
  controllers: [EnemiesGetRoute],
})
export class AdminGetEnemyModule {}
