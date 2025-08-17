import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Action } from 'src/auth/enums/action.enums';
import { Resource } from 'src/auth/enums/role.enums';

@Schema()
export class Permission {
    @Prop({  enum: Resource })
    resource: Resource;

    @Prop({ type: [{ type: String, enum: Action }] })
    action: Action[];
}

@Schema()
export class RoleModel extends Document {

    @Prop({})
    name: string;

    @Prop({ type: [Permission] })
    permissions: Permission[];
    
}

export const RoleModelSchema = SchemaFactory.createForClass(RoleModel);
