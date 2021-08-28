export class Enemy {
  constructor(
    readonly name: string,
    readonly maxHealth: number,
    readonly attack: number,
    readonly defense: number,
    readonly imageUrl: string,
  ) {}
}
