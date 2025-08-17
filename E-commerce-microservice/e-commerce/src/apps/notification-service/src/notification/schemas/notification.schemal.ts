import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, required: true })
  type: string; 

  @Prop({ type: String, default: null })
  userId: string | null; // null = global, string = cụ thể

  @Prop({ type: String, default: () => new Date().toISOString() })
  createdAt: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
