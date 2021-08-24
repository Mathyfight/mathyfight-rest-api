import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetPlayerAvatarInteractor } from './adapter/interactor/get-player-avatar.interactor';
import { GetPlayerAvatarRepository } from './adapter/interface/get-player-avatar.repository';
import { GetPlayerAvatarTypeOrmMySqlRepository } from './infrastructure/get-player-avatar.typeorm.mysql.repository';
import { PlayerGetAvatarRoute } from './presentation/player-get-avatar.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetPlayerAvatarInteractor,
    {
      provide: GetPlayerAvatarRepository,
      useClass: GetPlayerAvatarTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerGetAvatarRoute],
})
export class GetPlayerAvatarModule {}
