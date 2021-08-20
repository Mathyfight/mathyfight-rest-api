import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SearchPlayerInteractor } from './adapter/interactor/search-player.interactor';
import { SearchPlayerRepository } from './adapter/interface/search-player.repository';
import { SearchPlayerTypeOrmMySqlRepository } from './infrastructure/search-player.typeorm.mysql.repository';
import { PlayerSearchRoute } from './presentation/player-search.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    SearchPlayerInteractor,
    {
      provide: SearchPlayerRepository,
      useClass: SearchPlayerTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerSearchRoute],
})
export class SearchPlayerModule {}
