import { Module } from '@nestjs/common';
import { GetMathAreasModule } from './get-math-areas/get-math-areas.module';

@Module({
  imports: [GetMathAreasModule],
})
export class MathModule {}
