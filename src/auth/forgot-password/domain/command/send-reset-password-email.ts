export class SendResetPasswordEmail {
  constructor(resetPasswordTokenId: string, readonly toEmail: string) {
    const apiUrl = process.env.MATHYFIGHT_API_URL;
    this.text = `Reestablece tu contraseña ingresando al siguiente enlace: https://${apiUrl}/reset-password/${resetPasswordTokenId}`;
  }

  readonly fromEmail = process.env.MATHYFIGHT_SENDGRID_FROMEMAIL!;
  readonly fromName = 'Mathyfight';
  readonly subject = 'Reestablece tu contraseña';
  readonly text: string;
}
