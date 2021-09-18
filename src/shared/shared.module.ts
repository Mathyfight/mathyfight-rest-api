import { Global, Module } from '@nestjs/common';
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
