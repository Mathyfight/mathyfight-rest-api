export class AdminGetMathProblemInteractorResponse {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly difficultyId: string,
    readonly difficultyName: string,
    readonly imageUrl: string | null,
    readonly answers: AdminGetMathProblemAnswerInteractorResponse[],
  ) {}
}

export class AdminGetMathProblemAnswerInteractorResponse {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly isCorrect: boolean,
  ) {}
}
