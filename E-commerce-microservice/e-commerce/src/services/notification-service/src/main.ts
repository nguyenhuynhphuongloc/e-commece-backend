import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'notification', // hoặc tên package trong proto
      protoPath: join(__dirname, '../proto/notification.proto'),
      url: 'localhost:5007',
    },
  });

  await app.listen();
  console.log('🚀 Microservice-NotificationService is running on port localhost:5007 ');
}
bootstrap();
