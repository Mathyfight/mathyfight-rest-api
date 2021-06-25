import { ForgotPasswordErrors } from '../../domain/value-object/forgot-password.errors';
import { CreateResetPasswordToken } from '../command/create-reset-password-token';
import { ForgotPasswordCommand } from '../command/forgot-password.command';
import { SendResetPasswordEmail } from '../command/send-reset-password-email';
import { User } from '../entity/user';

export class ForgotPasswordDomainService {
  emailDoesNotExist = 'debe encontrarse registrado';

  invoke(
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
