import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/user/schemas/user.schemas'; // Sửa UserSchemal thành UserSchema
import { UserService } from 'src/user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      }
    ]),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:5004',
        },
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }