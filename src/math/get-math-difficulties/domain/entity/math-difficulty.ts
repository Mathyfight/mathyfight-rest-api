export class MathDifficulty {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly damageMultiplier: number,
    readonly maxSeconds: number,
  ) {}
}
