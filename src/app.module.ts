import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MathModule } from './math/math.module';
import { PlayerModule } from './player/player.module';
import { RaceModule } from './races/race.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MATHYFIGHT_MYSQL_URL,
      autoLoadEntities: true,
      synchronize: process.env.MATHYFIGHT_ENVIRONMENT === 'dev' ? true : false,
      logging: true,
      ssl: true,
      timezone: 'Z',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    StoreModule,
    PlayerModule,
    RaceModule,
    MathModule,
    SharedModule,
  ],
})
export class AppModule {}
