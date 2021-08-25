import { MathTopic } from '../../domain/entity/math-topic';

export abstract class GetMathTopicRepository {
  abstract getMathTopic(
    mathTopicId: string,
    playerId: string,
  ): Promise<MathTopic | null>;
}
