import { MathTopic } from '../../domain/entity/math-topic';

export class GetMathTopicsByAreaInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;

  constructor(mathTopic: MathTopic) {
    this.description = mathTopic.description;
    this.id = mathTopic.id;
    this.imageUrl = mathTopic.imageUrl;
    this.name = mathTopic.name;
  }
}
