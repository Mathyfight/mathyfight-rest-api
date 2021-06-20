import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from './typeorm/mysql/entity/avatar.equipment.typeorm.mysql';
import { AvatarTypeOrmMySql } from './typeorm/mysql/entity/avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from './typeorm/mysql/entity/equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from './typeorm/mysql/entity/player.typeorm.mysql';
import { ResetPasswordTokenTypeOrmMySql } from './typeorm/mysql/entity/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from './typeorm/mysql/entity/user.typeorm.mysql';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AvatarEquipmentTypeOrmMySql,
      AvatarTypeOrmMySql,
      EquipmentTypeOrmMySql,
      PlayerTypeOrmMySql,
      ResetPasswordTokenTypeOrmMySql,
      UserTypeOrmMySql,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
