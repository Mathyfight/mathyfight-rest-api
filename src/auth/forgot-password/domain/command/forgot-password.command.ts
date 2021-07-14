import { User } from '../entity/user';
import { ForgotPasswordErrors } from '../value-object/forgot-password.errors';
import { CreateResetPasswordToken } from './create-reset-password-token';
import { SendResetPasswordEmail } from './send-reset-password-email';

export class ForgotPasswordCommand {
  static emailDoesNotExist = 'debe encontrarse registrado';

  private constructor(
    readonly createResetPasswordToken: CreateResetPasswordToken,
    readonly sendResetPasswordEmail: SendResetPasswordEmail,
  ) {}

  static new(
    user: User | null,
    errors: ForgotPasswordErrors,
  ): ForgotPasswordCommand | null {
    if (user === null) {
      errors.email.push(this.emailDoesNotExist);
      return null;
    }
    const tokenCommand = new CreateResetPasswordToken(user.id);
    return new ForgotPasswordCommand(
      tokenCommand,
      new SendResetPasswordEmail(tokenCommand.id, user.email),
    );
  }
}
