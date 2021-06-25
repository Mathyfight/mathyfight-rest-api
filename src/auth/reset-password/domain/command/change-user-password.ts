import * as bcrypt from 'bcrypt';
import { HashedPassword } from 'src/auth/core/domain/value-object/hashed-password';

export class ChangeUserPassword {
  readonly newHashedPassword: string;

  constructor(readonly userId: string, password: string) {
    this.newHashedPassword = bcrypt.hashSync(
      password,
      HashedPassword.saltRounds,
    );
  }
}
