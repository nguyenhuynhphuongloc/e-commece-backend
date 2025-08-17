import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schemas/order.schemas';

@Module({
  imports: [
    // Import MongooseModule and the Order schema
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
