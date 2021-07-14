import * as bcrypt from 'bcrypt';

export class HashedPassword {
  static readonly saltRounds = 10;

  static passwordsMatch(hashedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static newPrimitive(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }
}
