import { CreateResetPasswordToken } from '../../domain/command/create-reset-password-token';
import { User } from '../../domain/entity/user';

export abstract class ForgotPasswordRepository {
  abstract getUserIdByEmail(email: string): Promise<User | null>;
  abstract saveResetPasswordToken(
    command: CreateResetPasswordToken,
  ): Promise<void>;
}
