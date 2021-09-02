import { Level } from './level';

export class MathTopic {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly levels: Level[],
  ) {}
}
