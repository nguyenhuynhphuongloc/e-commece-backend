import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  category?: string;

  @Prop()
  internalId?: string;

  @Prop({ required: true, unique: true }) // ✅ ID từ Stripe (prod_XXX)
  productId: string;

  @Prop()
  defaultPriceId: string;

  @Prop()
  currency: string;

  @Prop()
  unitAmount: number;

  @Prop()
  interval?: string; 
}

export const ProductSchema = SchemaFactory.createForClass(Product);
