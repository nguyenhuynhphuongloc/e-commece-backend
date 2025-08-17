// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'notification',
      protoPath: join(__dirname, './notification/notification.proto'),
      url: 'localhost:5006',
    },
  });

  await app.listen();
  console.log('✅ gRPC NotificationService is running on port 5006');
}
bootstrap();
