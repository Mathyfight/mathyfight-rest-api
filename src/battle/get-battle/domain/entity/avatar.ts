export class Avatar {
  constructor(
    readonly id: string,
    readonly currentHealth: number,
    readonly currentDefense: number,
    readonly currentExperience: number,
    readonly level: number,
  ) {}
}
