import { Uuid } from 'src/shared/domain/value-object/general/uuid';

export class CreateResetPasswordToken {
  constructor(readonly userId: string) {}

  readonly id: string = Uuid.newPrimitive();
  readonly createdAt = new Date();
  readonly hasBeenUsed = false;
}
