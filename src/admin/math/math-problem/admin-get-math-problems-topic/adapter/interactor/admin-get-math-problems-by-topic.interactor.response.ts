export class AdminGetMathProblemsByTopicInteractorResponse {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly difficulty: string,
    readonly imageUrl: string | null,
  ) {}
}
