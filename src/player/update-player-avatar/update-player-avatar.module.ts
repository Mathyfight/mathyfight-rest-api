import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UpdatePlayerAvatarInteractor } from './adapter/interactor/update-player-avatar.interactor';
import { UpdatePlayerAvatarRepository } from './adapter/interface/update-player-avatar.repository';
import { UpdatePlayerAvatarTypeOrmMySqlRepository } from './infrastructure/update-player-avatar.typeorm.mysql.repository';
import { PlayerUpdateAvatarRoute } from './presentation/player-update-avatar.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpdatePlayerAvatarInteractor,
    {
      provide: UpdatePlayerAvatarRepository,
      useClass: UpdatePlayerAvatarTypeOrmMySqlRepository,
    },
  ],
  controllers: [PlayerUpdateAvatarRoute],
})
export class PlayerUpdateAvatarModule {}
