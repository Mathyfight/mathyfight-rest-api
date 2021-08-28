import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TryAttackInteractor } from './adapter/interactor/try-attack.interactor';
import { TryAttackRepository } from './adapter/interface/try-attack.repository';
import { TryAttackTypeOrmMySqlRepository } from './infrastructure/try-attack.typeorm.mysql.repository';
import { BattleTryAttackRoute } from './presentation/battle-try-attack.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    TryAttackInteractor,
    {
      provide: TryAttackRepository,
      useClass: TryAttackTypeOrmMySqlRepository,
    },
  ],
  controllers: [BattleTryAttackRoute],
})
export class TryAttackModule {}
