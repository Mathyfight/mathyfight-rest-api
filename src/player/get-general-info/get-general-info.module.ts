import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetGeneralInfoRepository } from './application/adapter/get-general-info.repository';
import { GetGeneralInfoAppService } from './application/service/get-general-info.app.service';
import { GetGeneralInfoTypeOrmMySqlRepository } from './infrastructure/get-general-info.typeorm.mysql.repository';
import { PlayerGetGeneralInfoRoute } from './presentation/player-get-general-info.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetGeneralInfoAppService,
    {
      provide: GetGeneralInfoRepository,
      useClass: GetGeneralInfoTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetGeneralInfoRoute],
})
export class GetGeneralInfoModule {}
