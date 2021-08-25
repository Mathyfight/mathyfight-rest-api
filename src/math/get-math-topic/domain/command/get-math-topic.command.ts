import { MathTopic } from '../entity/math-topic';
import { GetMathTopicErrors } from '../value-object/get-math-topic.errors';

export class GetMathTopicCommand {
  static mathTopicNotFound = 'debe existir';

  private constructor(readonly mathTopic: MathTopic) {}

  static new(
    mathTopic: MathTopic | null,
    errors: GetMathTopicErrors,
  ): GetMathTopicCommand | null {
    if (mathTopic === null) {
      errors.topicId.push(this.mathTopicNotFound);
      return null;
    }
    return new GetMathTopicCommand(mathTopic);
  }
}
