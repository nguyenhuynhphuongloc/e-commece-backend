import { Module } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secretKey = configService.get<string>('pk_test');
        if (!secretKey) {
          throw new Error('Stripe secret key (pk_test) is not defined in environment variables');
        }
        return new Stripe(secretKey);
      },
    },
    {
      provide: 'STRIPE_PUBLIC_KEY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const publicKey = configService.get<string>('sk_test');
        if (!publicKey) {
          throw new Error('Stripe public key (sk_test) is not defined in environment variables');
        }
        return new Stripe(publicKey);
      },
    },
  ],
  exports: ['STRIPE_CLIENT', 'STRIPE_PUBLIC_KEY'],
})
export class StripeModule {}
