export class ResetPasswordToken {
  constructor(
    readonly id: string,
    readonly hasBeenUsed: boolean,
    readonly userId: string,
  ) {}
}
