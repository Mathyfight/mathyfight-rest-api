import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetPlayerProfileInteractor } from './adapter/interactor/get-player-profile.interactor';
import { GetPlayerProfileRepository } from './adapter/interface/get-player-profile.repository';
import { GetPlayerProfileTypeOrmMySqlRepository } from './infrastructure/get-player-profile.typeorm.mysql.repository';
import { PlayerGetProfileRoute } from './presentation/player-get-profile.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetPlayerProfileInteractor,
    {
      provide: GetPlayerProfileRepository,
      useClass: GetPlayerProfileTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetProfileRoute],
})
export class GetPlayerProfileModule {}
