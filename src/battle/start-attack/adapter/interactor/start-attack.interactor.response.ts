export class StartAttackInteractorResponse {
  constructor(
    readonly description: string,
    readonly problemImageUrl: string | null,
    readonly answers: StartAttackAnswerInteractorResponse[],
  ) {}
}

export class StartAttackAnswerInteractorResponse {
  constructor(readonly id: string, readonly description: string) {}
}
