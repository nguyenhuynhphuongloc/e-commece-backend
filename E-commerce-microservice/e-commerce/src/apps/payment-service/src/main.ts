import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'payment', // hoặc tên package trong proto
      protoPath: join(__dirname, '../proto/payment.proto'),
      url: 'localhost:5006',
    },
  });

  await app.listen();
  console.log('🚀 Microservice-PaymentService is running on port localhost:5006');
}
bootstrap();
