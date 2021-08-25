import { MathTopic } from '../../domain/entity/math-topic';

export abstract class GetMathTopicsByAreaRepository {
  abstract getMathTopicsByMathAreaId(mathAreaId: string): Promise<MathTopic[]>;
}
