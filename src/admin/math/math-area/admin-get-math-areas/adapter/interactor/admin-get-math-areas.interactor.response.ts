export class AdminGetMathAreasInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly mathTopics: AdminGetMathAreasTopicInteractorResponse[],
  ) {}
}

export class AdminGetMathAreasTopicInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly imageUrl: string,
  ) {}
}
