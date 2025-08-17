import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user', // 👈 tên package trong user.proto
      protoPath: join(__dirname, '../proto/user.proto'),
      url: 'localhost:5005',
    },
  });

  await app.listen();
  console.log('🚀Microservice-UserService is running on gRPC port localhost:5005');
}
bootstrap();
