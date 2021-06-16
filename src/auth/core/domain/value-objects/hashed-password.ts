import * as bcrypt from 'bcrypt';
import { Password } from './password';

export class HashedPassword {
  private constructor(readonly val: string) {}

  static saltRounds = 10;

  static async new(password: Password): Promise<HashedPassword> {
    const hashedPassword = await bcrypt.hash(password.val, this.saltRounds);
    return new HashedPassword(hashedPassword);
  }
}
