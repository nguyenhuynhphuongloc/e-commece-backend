import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'client' })
  role: string;

  @Prop({ default: 'basic' })
  account_type: string;

  @Prop()
  name: string;
}


export const UserSchema = SchemaFactory.createForClass(Users);
