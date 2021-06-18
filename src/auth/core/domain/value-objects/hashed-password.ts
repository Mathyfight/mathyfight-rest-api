import * as bcrypt from 'bcrypt';
import { Password } from './password';

export class HashedPassword {
  private constructor(readonly password: Password) {}

  get val(): string {
    return this.password.val;
  }

  static saltRounds = 10;

  static async new(password: Password): Promise<HashedPassword> {
    const hashedPassword = await bcrypt.hash(password.val, this.saltRounds);
    return new HashedPassword(Password.fromExisting(hashedPassword));
  }

  static fromExisting(hashedPassword: string): HashedPassword {
    return new HashedPassword(Password.fromExisting(hashedPassword));
  }
}
