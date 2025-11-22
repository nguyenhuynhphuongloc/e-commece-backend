import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Product, ProductSchema } from 'src/schemas/prodcut.schemas';
import { join } from 'path';
;

@Module({
  imports: [
    ClientsModule.register([
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
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath: join(__dirname, '../proto/inventory.proto'),
          url: 'localhost:5004',
        },
      },

    ]),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [
    ProductController
  ],
  providers: [ProductService],
})
export class ProductModule { }
