import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GetAdminUserRepository } from './adapter/interface/get-admin-user.repository';
import { GetAdminUserTypeOrmMySqlRepository } from './infrastructure/get-admin-user.typeorm.mysql.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: GetAdminUserRepository,
      useClass: GetAdminUserTypeOrmMySqlRepository,
    },
  ],
  exports: [GetAdminUserRepository],
})
export class AdminCoreModule {}
