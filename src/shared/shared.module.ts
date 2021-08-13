import { Global, Module } from '@nestjs/common';
import { JwtAuthGuard } from './presentation/jwt-auth.guard';
import { JwtStrategy } from './presentation/jwt.strategy';

@Global()
@Module({
  providers: [JwtStrategy, JwtAuthGuard],
})
export class SharedModule {}
