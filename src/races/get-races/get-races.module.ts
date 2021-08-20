import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetRacesInteractor } from './adapter/interactor/get-races.interactor';
import { GetRacesRepository } from './adapter/interface/get-races.repository';
import { GetRacesTypeOrmMySqlRepository } from './infrastructure/get-races.typeorm.mysql.repository';
import { RacesGetRoute } from './presentation/races-get.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetRacesInteractor,
    {
      provide: GetRacesRepository,
      useClass: GetRacesTypeOrmMySqlRepository,
    },
  ],
  controllers: [RacesGetRoute],
})
export class GetRacesModule {}
