import { Module } from '@nestjs/common';
import { GetRacesModule } from './get-races/get-races.module';

@Module({
  imports: [GetRacesModule],
})
export class RaceModule {}
