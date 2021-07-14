import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetGeneralInfoInteractor } from './adapter/interactor/get-general-info.interactor';
import { GetGeneralInfoRepository } from './adapter/interface/get-general-info.repository';
import { GetGeneralInfoTypeOrmMySqlRepository } from './infrastructure/get-general-info.typeorm.mysql.repository';
import { PlayerGetGeneralInfoRoute } from './presentation/player-get-general-info.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetGeneralInfoInteractor,
    {
      provide: GetGeneralInfoRepository,
      useClass: GetGeneralInfoTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetGeneralInfoRoute],
})
export class GetGeneralInfoModule {}
