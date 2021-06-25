import { CreateResetPasswordToken } from './create-reset-password-token';
import { SendResetPasswordEmail } from './send-reset-password-email';

export class ForgotPasswordCommand {
  constructor(
    readonly createResetPasswordToken: CreateResetPasswordToken,
    readonly sendResetPasswordEmail: SendResetPasswordEmail,
  ) {}
}
