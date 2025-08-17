import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'order', // hoặc tên package trong proto
      protoPath: join(__dirname, '../proto/order.proto'),
      url: 'localhost:50011',
    },
  });

  await app.listen();
  console.log('🚀 Microservice-OrderService is running on port localhost:50011');
}
bootstrap();
