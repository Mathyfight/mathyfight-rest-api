import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MATHYFIGHT_MYSQL_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl: true,
      timezone: 'Z',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
