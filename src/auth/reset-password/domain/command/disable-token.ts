export class DisableToken {
  constructor(readonly tokenId: string) {}

  readonly hasBeenUsed = true;
}
