import { Module } from '@nestjs/common';
import { GetMathAreasModule } from './get-math-areas/get-math-areas.module';
import { GetMathDifficultiesModule } from './get-math-difficulties/get-math-difficulties.module';
import { GetMathTopicModule } from './get-math-topic/get-math-topic.module';
import { GetMathTopicsByAreaModule } from './get-math-topics-by-area/get-math-topics-by-area.module';

@Module({
  imports: [
    GetMathAreasModule,
    GetMathTopicsByAreaModule,
    GetMathTopicModule,
    GetMathDifficultiesModule,
  ],
})
export class MathModule {}
