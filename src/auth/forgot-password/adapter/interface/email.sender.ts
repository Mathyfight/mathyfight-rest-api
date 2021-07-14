import { SendResetPasswordEmail } from '../../domain/command/send-reset-password-email';

export abstract class EmailSender {
  abstract send(command: SendResetPasswordEmail): Promise<void>;
}
