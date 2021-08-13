import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from './typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { AvatarTypeOrmMySql } from './typeorm/mysql/entity/avatar.typeorm.mysql';
import { BattleMathProblemTypeOrmMySql } from './typeorm/mysql/entity/battle-math-problem.typeorm.mysql';
import { BattleTypeOrmMySql } from './typeorm/mysql/entity/battle.typeorm.mysql';
import { DifficultyTypeOrmMySql } from './typeorm/mysql/entity/difficulty.typeorm.mysql';
import { EnemyTypeOrmMySql } from './typeorm/mysql/entity/enemy.typeorm.mysql';
import { EquipmentTypeOrmMySql } from './typeorm/mysql/entity/equipment.typeorm.mysql';
import { LevelTypeOrmMySql } from './typeorm/mysql/entity/level.typeorm.mysql';
import { MathAnswerTypeOrmMySql } from './typeorm/mysql/entity/math-answer.typeorm.mysql';
import { MathAreaTypeOrmMySql } from './typeorm/mysql/entity/math-area.typeorm.mysql';
import { MathProblemTypeOrmMySql } from './typeorm/mysql/entity/math-problem.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from './typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { MathTopicTypeOrmMySql } from './typeorm/mysql/entity/math-topic.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from './typeorm/mysql/entity/player-unlocked-math-topic-level.typeorm.mysql';
import { PlayerTypeOrmMySql } from './typeorm/mysql/entity/player.typeorm.mysql';
import { RaceTypeOrmMySql } from './typeorm/mysql/entity/race.typeorm.mysql';
import { ResetPasswordTokenTypeOrmMySql } from './typeorm/mysql/entity/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from './typeorm/mysql/entity/user.typeorm.mysql';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AvatarEquipmentTypeOrmMySql,
      AvatarTypeOrmMySql,
      BattleMathProblemTypeOrmMySql,
      BattleTypeOrmMySql,
      DifficultyTypeOrmMySql,
      EnemyTypeOrmMySql,
      EquipmentTypeOrmMySql,
      LevelTypeOrmMySql,
      MathAnswerTypeOrmMySql,
      MathAreaTypeOrmMySql,
      MathProblemTypeOrmMySql,
      MathTopicLevelTypeOrmMySql,
      MathTopicTypeOrmMySql,
      PlayerUnlockedMathTopicLevelTypeOrmMySql,
      PlayerTypeOrmMySql,
      RaceTypeOrmMySql,
      ResetPasswordTokenTypeOrmMySql,
      UserTypeOrmMySql,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
