import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './apps/api-gateway/src/auth/auth.module';
import { AuthController } from 'src/apps/api-gateway/src/auth/auth.controller';
import { AuthService } from 'src/apps/api-gateway/src/auth/auth.service';

@Module({
  imports: [
    AuthModule,

    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../proto/auth.proto'),
          url: 'localhost:5003',
        },
      },
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../proto/user.proto'),
          url: 'localhost:5005',
        },
      },
      {
        name: 'PAYMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'payment',
          protoPath: join(__dirname, '../proto/payment.proto'),
          url: 'localhost:5006',
        },
      },
      {
        name: 'ORDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: join(__dirname, '../proto/order.proto'),
          url: 'localhost:50011',
        },
      },
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../proto/product.proto'),
          url: 'localhost:5008',
        },
      },
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath: join(__dirname, '../proto/inventory.proto'),
          url: 'localhost:5004',
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
  ],
  controllers: [AuthController, AppController],
  providers: [AuthService, AppService],
})
export class AppModule { }
