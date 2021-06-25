import * as uuid from 'uuid';

export class CreateResetPasswordToken {
  readonly id: string;
  readonly createdAt: Date;
  readonly hasBeenUsed: boolean;

  constructor(readonly userId: string) {
    this.id = uuid.v4();
    this.createdAt = new Date();
    this.hasBeenUsed = false;
  }
}
