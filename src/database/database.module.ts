import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordTokenTypeOrmMySql } from './typeorm/mysql/entities/reset-password-token.typeorm.mysql';
import { UserTypeOrmMySql } from './typeorm/mysql/entities/user.typeorm.mysql';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTypeOrmMySql,
      ResetPasswordTokenTypeOrmMySql,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
