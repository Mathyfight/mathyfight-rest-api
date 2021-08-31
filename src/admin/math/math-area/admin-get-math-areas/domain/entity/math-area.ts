import { MathTopic } from './math-topic';

export class MathArea {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly mathTopics: MathTopic[],
  ) {}
}
