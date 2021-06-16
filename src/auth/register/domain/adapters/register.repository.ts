import { Email } from 'src/auth/core/domain/value-objects/email';
import { Username } from 'src/auth/core/domain/value-objects/username';
import { Uuid } from 'src/shared/domain/value-objects/general/uuid';
import { User } from '../entities/user';

export abstract class RegisterRepository {
  abstract getOneUserIdByUsername(username: Username): Promise<Uuid | null>;
  abstract getOneUserIdByEmail(email: Email): Promise<Uuid | null>;
  abstract saveNewUser(user: User): Promise<void>;
}
