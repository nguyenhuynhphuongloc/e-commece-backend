import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blacklist {
    
    @Prop({})
    refresh_token : string

    @Prop({ default: Date.now })
    createdAt: Date;

}

export const BlacklistSchemal = SchemaFactory.createForClass(Blacklist);
