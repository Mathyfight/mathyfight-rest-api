import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from './adapter/interface/jwt.service';
import { LoginRepository } from './adapter/interface/login.repository';
import { LoginInteractor } from './adapter/interactor/login.interactor';
import { LoginTypeOrmMySqlRepository } from './infrastructure/login.typeorm.mysql.repository';
import { NestJwtService } from './infrastructure/nest-jwt.service';
import { AuthLoginRoute } from './presentation/auth-login.route';

@Module({
  imports: [DatabaseModule],
  providers: [
    LoginInteractor,
    {
      provide: LoginRepository,
      useClass: LoginTypeOrmMySqlRepository,
    },
    {
      provide: JwtService,
      useClass: NestJwtService,
    },
  ],
  controllers: [AuthLoginRoute],
})
export class LoginModule {}
