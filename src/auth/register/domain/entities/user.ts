import { HashedPassword } from 'src/auth/core/domain/value-objects/hashed-password';
import { Uuid } from 'src/shared/domain/value-objects/general/uuid';
import { NonExistingEmail } from '../value-objects/non-existing-email';
import { NonExistingUsername } from '../value-objects/non-existing-username';

export class User {
  constructor(
    readonly id: Uuid,
    readonly username: NonExistingUsername,
    readonly hashedPassword: HashedPassword,
    readonly email: NonExistingEmail,
  ) {}

  static new(
    username: NonExistingUsername,
    hashedPassword: HashedPassword,
    email: NonExistingEmail,
  ): User {
    return new User(Uuid.new(), username, hashedPassword, email);
  }
}
