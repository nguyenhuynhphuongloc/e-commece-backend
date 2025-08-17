import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: { type: String },
        name: { type: String },
        unitAmount: { type: Number },
        currency: { type: String },
        quantity: { type: Number },
      },
    ],
    required: true,
  })
  items: {
    productId: string;
    name: string;
    unitAmount: number;
    currency: string;
    quantity: number;
  }[];

  @Prop({ default: 'pending', enum: ['pending', 'paid', 'failed', 'cancelled'] })
  status: string;

  @Prop()
  note?: string;

  @Prop()
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

