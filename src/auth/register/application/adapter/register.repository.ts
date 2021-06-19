import { Email } from 'src/auth/core/domain/value-object/email';
import { Username } from 'src/auth/core/domain/value-object/username';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { User } from '../../domain/entity/user';

export abstract class RegisterRepository {
  abstract getOneUserIdByUsername(username: Username): Promise<Uuid | null>;
  abstract getOneUserIdByEmail(email: Email): Promise<Uuid | null>;
  abstract saveNewUser(user: User): Promise<void>;
}
