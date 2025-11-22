import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

 
  async sendRegistrationEmail(data: { email: string; username: string }) {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: 'Support Team <support@example.com>',
        subject: 'regist successful',
        template: 'sub', // ❌ Không cần .hbs
        context: {
    name: 'John',
  },
      });

      console.log('✅ Confirmation email sent to:', data.email);
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
    }
  }


  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to,
        from: 'Auth Service <support@example.com>',
        subject: 'Reset your Password',
        html: `
          <p>You requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
        `,
      });

      console.log('✅ Password reset email sent to:', to);
    } catch (error) {
      console.error('❌ Failed to send reset email:', error);
    }
  }
}
