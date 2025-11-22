import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Blacklist, BlacklistSchemal } from 'src/auth/schemas/Blacklist.schemas';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import googleOuth from 'src/auth/config/google.outh';
import { GoogleStrategy } from 'src/strategies/google.stategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:5005',
        },
      },

      {
        name: 'NOTIFICATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: join(__dirname, '../proto/notification.proto'),
          url: 'localhost:5007',
        },
      },

    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', 
      signOptions: { expiresIn: '1h' }, 
    }),

    MongooseModule.forFeature([
      {
        name: Blacklist.name,
        schema: BlacklistSchemal,
      },
    ]),

    ConfigModule.forFeature(googleOuth),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
