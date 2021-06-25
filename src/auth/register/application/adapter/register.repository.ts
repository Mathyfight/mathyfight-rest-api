import { RegisterNewUser } from '../../domain/command/register-new-user';

export abstract class RegisterRepository {
  abstract getOneUserIdByUsername(username: string): Promise<string | null>;
  abstract getOneUserIdByEmail(email: string): Promise<string | null>;
  abstract saveNewUser(command: RegisterNewUser): Promise<void>;
}
