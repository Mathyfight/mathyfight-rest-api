import { Module } from '@nestjs/common';
import { AdminGetMathAreasModule } from './admin-get-math-areas/admin-get-math-areas.module';

@Module({
  imports: [AdminGetMathAreasModule],
})
export class AdminMathAreaModule {}
