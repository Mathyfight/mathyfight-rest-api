import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetPlayerStatisticsInteractor } from './adapter/interactor/get-player-statistics.interactor';
import { GetPlayerStatisticsRepository } from './adapter/interface/get-player-statistics.repository';
import { GetPlayerStatisticsTypeOrmMySqlRepository } from './infrastructure/get-player-statistics.typeorm.mysql.repository';
import { PlayerGetStatisticsRoute } from './presentation/player-get-statistics.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetPlayerStatisticsInteractor,
    {
      provide: GetPlayerStatisticsRepository,
      useClass: GetPlayerStatisticsTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetStatisticsRoute],
})
export class GetPlayerStatisticsModule {}
