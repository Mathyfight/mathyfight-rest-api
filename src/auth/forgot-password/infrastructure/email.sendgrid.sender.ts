import * as sgMail from '@sendgrid/mail';
import { EmailSender } from '../adapter/interface/email.sender';
import { SendResetPasswordEmail } from '../domain/command/send-reset-password-email';

export class EmailSendgridSender implements EmailSender {
  async send(command: SendResetPasswordEmail): Promise<void> {
    sgMail.setApiKey(process.env.MATHYFIGHT_SENDGRID_TOKEN!);
    await sgMail
      .send({
        to: command.toEmail,
        from: {
          email: command.fromEmail,
          name: command.fromName,
        },
        subject: command.subject,
        text: command.text,
        html: command.text,
      })
      .catch((err) => console.error(err));
    return;
  }
}
