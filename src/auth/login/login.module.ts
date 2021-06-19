import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from './application/adapter/jwt.service';
import { LoginRepository } from './application/adapter/login.repository';
import { LoginAppService } from './application/service/login.app.service';
import { LoginTypeOrmMySqlRepository } from './infrastructure/login.typeorm.mysql.repository';
import { NestJwtService } from './infrastructure/nest-jwt.service';
import { LoginRoute } from './presentation/login.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    LoginAppService,
    {
      provide: LoginRepository,
      useClass: LoginTypeOrmMySqlRepository,
    },
    {
      provide: JwtService,
      useClass: NestJwtService,
    },
  ],
  controllers: [LoginRoute],
})
export class LoginModule {}
