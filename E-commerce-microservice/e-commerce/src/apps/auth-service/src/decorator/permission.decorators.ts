import { SetMetadata } from "@nestjs/common";
import { Permission } from "src/auth/schemas/role.schemas";

export const Permissions_Key = "permissions"

export const SetPermissions = ( permissions : Permission[] ) => 
    SetMetadata(Permissions_Key,permissions)