import { HashedPassword } from 'src/auth/core/domain/value-object/hashed-password';

export class ChangeUserPassword {
  constructor(readonly userId: string, password: string) {
    this.newHashedPassword = HashedPassword.newPrimitive(password);
  }

  readonly newHashedPassword: string;
}
