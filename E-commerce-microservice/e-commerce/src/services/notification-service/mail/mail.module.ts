import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const templateDir = join(__dirname, '..', 'mail', 'templates');
console.log(' Template directory:', templateDir); 

@Module({
    imports: [
        MailerModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
            transport: {
              host: config.get<string>('MAIL_HOST'),
              secure: false,
              auth: {
                user: config.get<string>('Mail_User'),
                pass: config.get<string>('Mail_password'),
              },
            },
            defaults: {
              from: `"No Reply" <${config.get<string>('MAIL_FROM')}>`,
            },
            template: {
                dir: join(__dirname, '..', 'mail', 'templates'), 
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
              }
          }),
        }),
      ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
