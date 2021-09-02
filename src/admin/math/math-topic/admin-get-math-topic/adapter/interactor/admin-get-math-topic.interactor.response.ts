export class AdminGetMathTopicInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly levels: AdminGetMathTopicLevelInteractorResponse[],
  ) {}
}

export class AdminGetMathTopicLevelInteractorResponse {
  constructor(
    readonly number: number,
    readonly enemyName: string,
    readonly enemyImageUrl: string,
  ) {}
}
