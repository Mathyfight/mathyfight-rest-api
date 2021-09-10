import { Global, Module } from '@nestjs/common';
import { GetAdminUserRepository } from 'src/admin/core/adapter/interface/get-admin-user.repository';
import { GetAdminUserTypeOrmMySqlRepository } from 'src/admin/core/infrastructure/get-admin-user.typeorm.mysql.repository';
import { StorageService } from './adapter/interface/storage.service';
import { AzureStorageService } from './infrastructure/azure-storage.service';
import { JwtAuthGuard } from './presentation/jwt-auth.guard';
import { JwtStrategy } from './presentation/jwt.strategy';

@Global()
@Module({
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: StorageService,
      useClass: AzureStorageService,
    },
  ],
  exports: [StorageService],
})
export class SharedModule {}
