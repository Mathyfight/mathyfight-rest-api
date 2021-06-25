export class DisableToken {
  readonly hasBeenUsed: boolean;

  constructor(readonly tokenId: string) {
    this.hasBeenUsed = true;
  }
}
